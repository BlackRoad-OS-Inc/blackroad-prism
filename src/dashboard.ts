// ============================================================================
// BLACKROAD OS, INC. — Prism Console Dashboard
// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
// ============================================================================

export function dashboard(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PRISM CONSOLE — BlackRoad OS</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #000;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  min-height: 100vh;
}
.header {
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA, #8844FF, #4488FF, #00D4FF) 1;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA, #8844FF, #4488FF, #00D4FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header .meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #666;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  padding: 24px 32px;
}
.card {
  border: 1px solid #222;
  border-radius: 8px;
  padding: 20px;
}
.card h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #222;
}
.node-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
}
.node {
  border: 1px solid #333;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
}
.node .name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}
.node .ip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #666;
}
.node .status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  margin-top: 6px;
  font-weight: 500;
}
.node.online { border-color: #00ff5588; }
.node.online .status { color: #00ff55; }
.node.offline { border-color: #ff335588; }
.node.offline .status { color: #ff3355; }
.node.degraded { border-color: #ffaa0088; }
.node.degraded .status { color: #ffaa00; }
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}
.kpi {
  text-align: center;
  padding: 12px 0;
}
.kpi .value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #FF6B2B, #00D4FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.kpi .label {
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}
.task-list { list-style: none; }
.task-list li {
  padding: 8px 0;
  border-bottom: 1px solid #111;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}
.task-list li:last-child { border-bottom: none; }
.tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid;
  font-family: 'JetBrains Mono', monospace;
}
.tag.urgent { border-color: #ff3355; color: #ff3355; }
.tag.high { border-color: #ff8800; color: #ff8800; }
.tag.medium { border-color: #ffcc00; color: #ffcc00; }
.tag.low { border-color: #00cc66; color: #00cc66; }
.event-list { list-style: none; }
.event-list li {
  padding: 6px 0;
  border-bottom: 1px solid #111;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #888;
}
.event-list .type { color: #4488FF; }
.event-list .time { color: #444; }
.status-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0a0a0a;
  border-top: 1px solid #222;
  padding: 8px 32px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #444;
  display: flex;
  justify-content: space-between;
}
.status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
}
.status-dot.green { background: #00ff55; }
.status-dot.red { background: #ff3355; }
.status-dot.yellow { background: #ffaa00; }
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; padding: 16px; }
  .header { padding: 16px; }
  .header h1 { font-size: 18px; }
}
</style>
</head>
<body>

<div class="header">
  <h1>PRISM CONSOLE</h1>
  <div class="meta">
    <span id="clock"></span> &middot; BlackRoad OS v2.0
  </div>
</div>

<div class="grid">
  <!-- Fleet Status -->
  <div class="card" style="grid-column: span 2;">
    <h2>Fleet Nodes</h2>
    <div class="node-grid" id="fleet"></div>
  </div>

  <!-- KPIs -->
  <div class="card">
    <h2>KPIs</h2>
    <div class="kpi-grid" id="kpis"></div>
  </div>

  <!-- Engineering Tasks -->
  <div class="card" style="grid-column: span 2;">
    <h2>Engineering Tasks</h2>
    <ul class="task-list" id="tasks"></ul>
  </div>

  <!-- Recent Events -->
  <div class="card">
    <h2>Events</h2>
    <ul class="event-list" id="events"></ul>
  </div>

  <!-- Cloudflare -->
  <div class="card">
    <h2>Cloudflare</h2>
    <div class="kpi-grid">
      <div class="kpi"><div class="value">95+</div><div class="label">Pages</div></div>
      <div class="kpi"><div class="value">40</div><div class="label">KV</div></div>
      <div class="kpi"><div class="value">8</div><div class="label">D1</div></div>
      <div class="kpi"><div class="value">10</div><div class="label">R2</div></div>
      <div class="kpi"><div class="value">18</div><div class="label">Tunnels</div></div>
      <div class="kpi"><div class="value">48+</div><div class="label">Domains</div></div>
    </div>
  </div>

  <!-- Repos -->
  <div class="card">
    <h2>Recent Repos</h2>
    <ul class="event-list" id="repos"></ul>
  </div>
</div>

<div class="status-bar">
  <span><span class="status-dot green" id="health-dot"></span><span id="health-text">Loading...</span></span>
  <span>Prism Console &middot; prism.blackroad.io</span>
</div>

<script>
const BASE = '';

function updateClock() {
  document.getElementById('clock').textContent = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

async function loadFleet() {
  try {
    const data = await (await fetch(BASE + '/api/fleet')).json();
    const el = document.getElementById('fleet');
    el.innerHTML = data.nodes.map(n => \`
      <div class="node \${n.status}">
        <div class="name">\${n.name}</div>
        <div class="ip">\${n.ip}</div>
        <div class="status">\${n.status.toUpperCase()}</div>
      </div>
    \`).join('');
  } catch(e) { console.error('Fleet error:', e); }
}

async function loadKPIs() {
  try {
    const data = await (await fetch(BASE + '/api/kpis')).json();
    const el = document.getElementById('kpis');
    el.innerHTML = [
      ['commits', 'Commits'], ['repos', 'Repos'], ['loc', 'LOC'],
      ['fleet', 'Fleet'], ['models', 'Models']
    ].map(([k, l]) => \`
      <div class="kpi"><div class="value">\${data[k] || '—'}</div><div class="label">\${l}</div></div>
    \`).join('');
  } catch(e) { console.error('KPI error:', e); }
}

async function loadTasks() {
  try {
    const data = await (await fetch(BASE + '/api/tasks')).json();
    const el = document.getElementById('tasks');
    el.innerHTML = data.slice(0, 12).map(t => {
      const priority = t.labels.find(l => ['urgent','high','medium','low'].includes(l.name));
      const tag = priority ? \`<span class="tag \${priority.name}">\${priority.name}</span>\` : '';
      return \`<li>\${tag} <a href="\${t.url}" target="_blank" style="color:#ccc;text-decoration:none;">#\${t.number} \${t.title}</a></li>\`;
    }).join('');
  } catch(e) { console.error('Tasks error:', e); }
}

async function loadEvents() {
  try {
    const data = await (await fetch(BASE + '/api/events')).json();
    const el = document.getElementById('events');
    if (data.length === 0) {
      el.innerHTML = '<li style="color:#333">No events yet — connect GitHub webhook to /api/webhook</li>';
      return;
    }
    el.innerHTML = data.slice(0, 15).map(e => \`
      <li><span class="type">\${e.type}</span> \${e.title || e.action || ''} <span class="time">\${e.timestamp?.slice(0,16)}</span></li>
    \`).join('');
  } catch(e) { console.error('Events error:', e); }
}

async function loadRepos() {
  try {
    const data = await (await fetch(BASE + '/api/repos')).json();
    const el = document.getElementById('repos');
    el.innerHTML = data.recent?.map(r => \`
      <li>\${r.name} <span style="color:#444">\${r.language || ''}</span></li>
    \`).join('') || '<li>No repos</li>';
  } catch(e) { console.error('Repos error:', e); }
}

async function loadHealth() {
  try {
    const data = await (await fetch(BASE + '/api/health')).json();
    const dot = document.getElementById('health-dot');
    const text = document.getElementById('health-text');
    dot.className = 'status-dot ' + (data.status === 'operational' ? 'green' : data.status === 'degraded' ? 'yellow' : 'red');
    text.textContent = data.status.toUpperCase() + ' — ' + data.nodes_online + '/' + data.nodes_total + ' nodes';
  } catch(e) { console.error('Health error:', e); }
}

async function refresh() {
  updateClock();
  await Promise.all([loadFleet(), loadKPIs(), loadTasks(), loadEvents(), loadRepos(), loadHealth()]);
}

refresh();
setInterval(refresh, 30000);
setInterval(updateClock, 1000);
</script>
</body>
</html>`;
}
