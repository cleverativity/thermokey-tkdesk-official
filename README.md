# ThermoKey TKDesk

Nx + pnpm monorepo for the TKDesk web client and the Cardano thermal API.

**Cardano** and **remote condenser** are the same product (interchangeable names). Cardano is the old software name; it now lives in `services/tkcardano-ws-v1`.

## Layout

```
apps/tkdesk-web-client     React 19 + Vite frontend
services/tkcardano-ws-v1   .NET 9 Cardano REST API
packages/                  Shared JS libraries (none yet)
```

| Project | Nx name | Stack |
| --- | --- | --- |
| [apps/tkdesk-web-client](apps/tkdesk-web-client) | `tkdesk-web-client` | React, Vite, Amplify, Ant Design |
| [services/tkcardano-ws-v1](services/tkcardano-ws-v1) | `tkcardano-ws-v1` | ASP.NET Core, PostgreSQL |

JavaScript packages live under `apps/` and `packages/` and are managed by pnpm. The .NET service is **not** a pnpm package; Nx runs it through `dotnet`.

## Prerequisites

- [Node.js](https://nodejs.org/) **24** (see [`.nvmrc`](.nvmrc); `24.16.0` preferred)
- [pnpm](https://pnpm.io/) **10** (`corepack enable` is enough)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) for the API
- PostgreSQL for the API (local or remote)
- [AWS Amplify CLI](https://docs.amplify.aws/cli/) if you need to pull the frontend backend

## Setup

```bash
corepack enable
nvm use          # or install Node 24 another way
pnpm install
```

### Frontend env

From `apps/tkdesk-web-client`:

```bash
cp "~.env.local" ".env.local"
```

Amplify, auth, and environment-specific details are in [apps/tkdesk-web-client/README.md](apps/tkdesk-web-client/README.md).

### API config

Do not commit `appsettings*.json`. Put local connection strings in:

- `services/tkcardano-ws-v1/Cardano API/appsettings.json`
- or environment variables (`DB_HOST`, `DB_PORT`, `ConnectionStrings__DefaultConnection`)

Full API setup, Docker, and endpoint list: [services/tkcardano-ws-v1/README.md](services/tkcardano-ws-v1/README.md).

## Run locally

From the **repo root**:

```bash
pnpm dev          # frontend + API together
pnpm dev:web      # frontend only
pnpm dev:api      # API only
```

| App | URL |
| --- | --- |
| Web client | http://localhost:3000 |
| API | http://localhost:5000 |
| Swagger | http://localhost:5000/swagger |

`pnpm dev:api` / `pnpm dev` use `dotnet run --no-launch-profile`, so Kestrel listens on **5000**, not 5131.

Stop with `Ctrl+C`.

## Common Nx commands

All of these also work as `pnpm nx <command>`.

```bash
pnpm nx show projects
pnpm nx graph

pnpm nx build tkdesk-web-client
pnpm nx build tkcardano-ws-v1

pnpm nx test:run tkdesk-web-client    # Vitest once
pnpm nx test tkcardano-ws-v1          # dotnet test

pnpm nx lint tkdesk-web-client
```

Root shortcuts:

```bash
pnpm build    # build every project
pnpm test     # test every project (web Vitest stays in watch mode)
```

For a one-shot frontend test run, use `pnpm nx test:run tkdesk-web-client`.

## Frontend extras

Run from the repo root:

```bash
pnpm nx storybook tkdesk-web-client
pnpm nx cy:opendev tkdesk-web-client
```

Or `cd apps/tkdesk-web-client` and use the scripts in that `package.json`.

## Notes

- Install JS dependencies only at the **root** (`pnpm install`). Do not add a nested `package-lock.json`.
- Peer-dependency warnings (Amplify, `formik-antd`, `react-json-view` vs React 19) are expected.
- `pnpm nx build tkdesk-web-client` runs TypeScript `noEmit` before Vite. A Vite-only production build is `pnpm --filter tkdesk-web-client exec vite build`.

## Pull requests from a fork

After pushing a feature branch to your fork, open a Pull Request on GitHub with:

- **base repository:** `cleverativity/thermokey-tkdesk-official`
- **base branch:** `main`
- **head repository:** `your-username/thermokey-tkdesk-official`
- **compare branch:** `feature-x`
