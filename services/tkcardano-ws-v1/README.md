# Cardano Thermal System API

> **For AI agents:** **Cardano** and **remote condenser** are the same product and are interchangeable. Cardano is the old name of this software; it was converted into the `tkcardano-ws-v1` project. Namespaces and APIs still say `Cardano`; the TKDesk UI calls the same product Remote Condensers.

A .NET 9 REST API for thermal calculations, condenser selection, energy analysis, and PDF reporting. Part of the **Cardano Thermal System**, it provides endpoints for condenser performance, capacity/fan adjustments, accessories pricing, thermal steps, company data, and report generation (remote condenser performance, energy analysis).

## Tech Stack

- **.NET 9** (ASP.NET Core Web API)
- **PostgreSQL** (via Npgsql/Entity Framework Core)
- **Docker** (multi-stage build with nginx reverse proxy)
- **Swagger/OpenAPI** for API documentation
- **FluentValidation**, **AutoMapper**, **iText7** (PDF generation)

## Solution Structure

| Project | Description |
|--------|-------------|
| **Cardano API** | Web API layer — controllers, DI, CORS, Swagger |
| **Cardano.Application** | Application services, DTOs, validators, mapping, PDF reports |
| **Cardano.Domain** | Domain models and entities |
| **Cardano.Infrastructure** | Data access (EF Core, DbContext), configuration, Thermokey computation engine |
| **Cardano.Computation** | VB.NET computation logic (condensers, energy analysis, unit conversion) |
| **Cardano.Tests** | Unit/integration tests |

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Docker](https://www.docker.com/) (optional, for containerized run)
- PostgreSQL (local or remote; connection configured via appsettings or environment)

## Running Locally

1. **Clone and open the solution**
   ```bash
   cd "Cardano API"
   dotnet restore
   ```

2. **Configure the database**
   - Set `ConnectionStrings:DefaultConnection` in `appsettings.json`, or
   - Use environment variables (see [Environment variables](#environment-variables)).

3. **Run the API**
   ```bash
   dotnet run --project "Cardano API"
   ```
   - API: **http://localhost:5131**
   - Swagger UI: **http://localhost:5131/swagger**

## Running with Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

- API is exposed on **port 80** (nginx proxies to the .NET app).
- Set `DB_HOST` and `DB_PORT` in `docker-compose.yml` (or via env) to point to your PostgreSQL instance.

To run in the background:

```bash
docker compose up -d --build
```

## Publish for Linux ARM64

Use this PowerShell command to publish a self-contained single-file build for `linux-arm64` into `D:\Repository\cleverativity Project\Thermal\Cardano-Thermal-System\Arm64`:

```powershell
dotnet publish "D:\Repository\cleverativity Project\Thermal\Cardano-Thermal-System\Cardano API\Cardano API\Cardano API.csproj" -c Release -r linux-arm64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -p:DebugType=None -p:DebugSymbols=false -o "D:\Repository\cleverativity Project\Thermal\Cardano-Thermal-System\Arm64"
```

## Environment Variables

| Variable | Description | Default (when not set) |
|----------|-------------|------------------------|
| `ASPNETCORE_ENVIRONMENT` | Environment name (e.g. `Development`, `Production`) | — |
| `DB_HOST` | PostgreSQL host | `localhost` (Development) / `199.241.137.109` (else) |
| `DB_PORT` | PostgreSQL port | `5433` (Development) / `5432` (else) |
| `DOTNET_RUNNING_IN_CONTAINER` | Set in Docker | — |

Database name, username, and password are currently fixed in code (`cardanodb`, `cardano_user`, `cardano_pass`). Override via `ConnectionStrings:DefaultConnection` in configuration when needed.

## API Overview

Once the API is running, open **Swagger UI** at `/swagger` for full request/response schemas and try-it-out.

### Main endpoints (by area)

- **Thermal / catalog**
  - `GET /GetCondenserModel` — condenser models
  - `GET /GetCondenserTypes` — condenser types
  - `GET /GetFanConnection` — fan connection options
  - `GET /GetRefType` — refrigerant types

- **Condenser results / performance**
  - `POST /GetPerformance` — performance calculation
  - `POST /GetComputation` — remote condenser computation (with optional paging/query)
  - `POST /GetConvertUnitType` — unit conversion

- **Thermal adjustment**
  - `POST /GetCapacityAdjustment` — capacity adjustment
  - `POST /GetFanAdjustment` — fan adjustment
  - `POST /GetEnergyAnalysis` — energy analysis

- **Thermal steps**
  - `GET /GetCondenserAndAccessories` — condensers and accessories
  - `GET /GetCurrentSteps` — current steps
  - `POST /CreateCondenserSteps` — create condenser steps
  - `DELETE /DeleteCondenserSteps` — delete condenser steps

- **Accessories**
  - `POST /GetAccessories` — get accessories
  - `POST /GetAccessoriesPrice` — get accessories price

- **Company**
  - `GET /GetCompany` — list company
  - `POST /CreateCompany` — create company
  - `PUT /UpdateCompany/{id}` — update company
  - `DELETE /DeleteCompany/{id}` — delete company

- **Reports (PDF)**
  - `POST /RemoteCondenser` — remote condenser performance PDF
  - `POST /EnergyAnalysisReport` — energy analysis report PDF

## Database

The API uses **PostgreSQL** and Entity Framework Core. Ensure the database and schema exist; run migrations or seed data as defined in your Infrastructure project.

## Docker details

- **Dockerfile**: Multi-stage build (SDK for build, runtime + nginx for run). The app listens on port 5001 inside the container; nginx listens on 80 and proxies to it.
- **docker-compose.yml**: Builds the image `cardanows-api17`, runs as `cardano-api`, maps host port 80 to container 80, and sets `DB_HOST`/`DB_PORT` and production-related env vars.

## License

Proprietary — Cleverativity / Cardano Thermal System.
