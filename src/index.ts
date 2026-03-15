// ============================================================================
// BLACKROAD OS, INC. — Prism Console Worker
// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
// ============================================================================

import { dashboard } from './dashboard';

interface Env {
  PRISM_KV: KVNamespace;
  GITHUB_TOKEN?: string;
  GITHUB_ORG: string;
  GITHUB_REPO: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    try {
      // API routes
      if (path === '/api/fleet') return json(await getFleetStatus(env), headers);
      if (path === '/api/tasks') return json(await getTasks(env), headers);
      if (path === '/api/kpis') return json(await getKPIs(env), headers);
      if (path === '/api/health') return json(await getHealth(env), headers);
      if (path === '/api/repos') return json(await getRepos(env), headers);
      if (path === '/api/events') return json(await getEvents(env), headers);

      if (path === '/api/webhook' && request.method === 'POST') {
        return json(await handleWebhook(request, env), headers);
      }

      // Dashboard
      return new Response(dashboard(), {
        headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' },
      });
    } catch (e: any) {
      return json({ error: e.message }, headers, 500);
    }
  },
};

function json(data: any, headers: Record<string, string>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function getFleetStatus(env: Env): Promise<any> {
  const cached = await env.PRISM_KV.get('fleet:status', 'json');
  if (cached) return cached;

  return {
    timestamp: new Date().toISOString(),
    nodes: [
      { name: 'Alice', ip: '192.168.4.49', status: 'online', type: 'Pi 400', role: 'Gateway' },
      { name: 'Cecilia', ip: '192.168.4.96', status: 'online', type: 'Pi 5', role: 'AI Inference' },
      { name: 'Octavia', ip: '192.168.4.100', status: 'offline', type: 'Pi 5', role: 'Git/Storage' },
      { name: 'Aria', ip: '192.168.4.98', status: 'offline', type: 'Pi 5', role: 'Monitoring' },
      { name: 'Lucidia', ip: '192.168.4.38', status: 'online', type: 'Pi 5', role: 'Apps/CI' },
      { name: 'Anastasia', ip: 'nyc1', status: 'degraded', type: 'Droplet', role: 'WG Hub' },
      { name: 'Gematria', ip: 'nyc3', status: 'degraded', type: 'Droplet', role: 'Backup' },
    ],
  };
}

async function getTasks(env: Env): Promise<any> {
  const gh = env.GITHUB_TOKEN ? { Authorization: `token ${env.GITHUB_TOKEN}` } : {};
  try {
    const resp = await fetch(
      `https://api.github.com/repos/${env.GITHUB_ORG}/${env.GITHUB_REPO}/issues?state=open&per_page=30`,
      { headers: { ...gh, 'User-Agent': 'BlackRoad-Prism/2.0' } }
    );
    if (!resp.ok) throw new Error(`GitHub API: ${resp.status}`);
    const issues: any[] = await resp.json();
    return issues.map((i) => ({
      number: i.number,
      title: i.title,
      labels: i.labels.map((l: any) => ({ name: l.name, color: l.color })),
      state: i.state,
      created: i.created_at,
      url: i.html_url,
    }));
  } catch {
    return [];
  }
}

async function getKPIs(env: Env): Promise<any> {
  const cached = await env.PRISM_KV.get('kpis:latest', 'json');
  return cached || { commits: 333, repos: 306, loc: '7.2M', fleet: '3/5', models: 27 };
}

async function getHealth(env: Env): Promise<any> {
  const fleet = await getFleetStatus(env);
  const online = fleet.nodes.filter((n: any) => n.status === 'online').length;
  return {
    status: online >= 3 ? 'operational' : online >= 1 ? 'degraded' : 'down',
    nodes_online: online,
    nodes_total: fleet.nodes.length,
    timestamp: new Date().toISOString(),
  };
}

async function getRepos(env: Env): Promise<any> {
  const gh = env.GITHUB_TOKEN ? { Authorization: `token ${env.GITHUB_TOKEN}` } : {};
  try {
    const resp = await fetch(
      `https://api.github.com/users/${env.GITHUB_ORG}/repos?per_page=100&sort=updated`,
      { headers: { ...gh, 'User-Agent': 'BlackRoad-Prism/2.0' } }
    );
    const repos: any[] = await resp.json();
    return {
      total: repos.length,
      recent: repos.slice(0, 10).map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        updated: r.updated_at,
        stars: r.stargazers_count,
      })),
    };
  } catch {
    return { total: 0, recent: [] };
  }
}

async function getEvents(env: Env): Promise<any> {
  const events = await env.PRISM_KV.get('events:recent', 'json');
  return events || [];
}

async function handleWebhook(request: Request, env: Env): Promise<any> {
  const event = request.headers.get('X-GitHub-Event') || 'unknown';
  const payload: any = await request.json();

  const entry = {
    type: event,
    action: payload.action,
    repo: payload.repository?.full_name,
    title: payload.issue?.title || payload.pull_request?.title || '',
    timestamp: new Date().toISOString(),
  };

  // Store in KV
  const existing: any[] = (await env.PRISM_KV.get('events:recent', 'json')) || [];
  existing.unshift(entry);
  await env.PRISM_KV.put('events:recent', JSON.stringify(existing.slice(0, 50)));

  return { received: true, event };
}
