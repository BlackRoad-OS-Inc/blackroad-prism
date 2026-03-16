<div align="center">
<img src="https://images.blackroad.io/pixel-art/road-logo.png" alt="BlackRoad OS" width="80" />

# BlackRoad Prism

**Operations console. Fleet health, KPIs, tasks, events. The nerve center.**

[![BlackRoad OS](https://img.shields.io/badge/BlackRoad_OS-Pave_Tomorrow-FF2255?style=for-the-badge&labelColor=000000)](https://blackroad.io)
</div>

---

## Live

**[prism.blackroad.io](https://prism.blackroad.io)**

## Endpoints

```bash
# Fleet status (live from all 5 nodes)
curl https://prism.blackroad.io/api/fleet

# System health
curl https://prism.blackroad.io/api/health

# KPIs (repos, models, containers, ports)
curl https://prism.blackroad.io/api/kpis

# Public stats
curl https://prism.blackroad.io/api/public/stats

# Landing CMS
curl https://prism.blackroad.io/api/public/landing

# Snapshots
curl https://prism.blackroad.io/api/snapshots
```

## Architecture

Prism Enterprise is a 16K-file Node.js/Express platform deployed on Octavia (Pi 5) behind a Cloudflare tunnel. It includes:

- **React frontend** — Co-create with Lucidia
- **Live fleet data** — proxied from stats-blackroad Worker
- **SQLite database** — via better-sqlite3
- **Lucidia AI integration** — conversation projects, agent routing
- **RoadCoin metering** — usage tracking and billing
- **Snapshot/rollback system** — infrastructure backup management

## Stack

- Node.js + Express
- React + Vite (frontend)
- SQLite (better-sqlite3)
- Cloudflare Tunnel (via Octavia)
- Socket.IO (real-time updates)

---

*Copyright (c) 2024-2026 BlackRoad OS, Inc. All rights reserved.*
