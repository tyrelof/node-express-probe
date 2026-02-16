# node-express-probe

![GitHub manual smoke](https://github.com/tyrelof/node-express-probe/actions/workflows/manual-smoke.yml/badge.svg)
![GitLab manual pipeline](https://img.shields.io/badge/GitLab-manual%20pipeline-orange?logo=gitlab)

Minimal Node.js (Express) application used for deployment validation across container and orchestration platforms.

This repository is part of a cross-stack **Deployment Probe Series** used to:

- Validate Docker builds
- Test Kubernetes / ECS deployments
- Verify CI/CD smoke tests
- Experiment with runtime behavior across stacks

---

## Endpoints

- `GET /` → basic JSON response
- `GET /health` → returns `200 OK` (health check)
- `GET /ready` → readiness probe endpoint
- `GET /live` → liveness probe endpoint
- `GET /version` → app version from `package.json` and optional commit from `APP_COMMIT_SHA`

---

## Local Run

```bash
npm install
npm start
