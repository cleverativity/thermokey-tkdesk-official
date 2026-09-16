# How to Reach ~90% Clean Architecture – Sample Code

This document shows the exact changes to have **ThermalAdjustmentService** depend on **IThermalAdjustment** (injected), register **IThermalAdjustment → ThermalAdjustment** in DI, and remove **Cardano.Computation** and **InstinctCodeII** from the Application layer.
**No project code is modified here**; use these samples as a reference when you apply the refactor.

---

## 1. Goal

| Before | After |
|--------|--------|
| ThermalAdjustmentService constructs `AdjustmentCapacity`, `AdjustmentFan`, `EAnalysis` from Cardano.Computation | ThermalAdjustmentService injects **IThermalAdjustment** and calls its methods |
| Application references Cardano.Computation and InstinctCodeII | Application has **no** reference to Cardano.Computation or InstinctCodeII |
| Clean Architecture ~80% | Clean Architecture ~90% |

**IThermalAdjustment** and **ThermalAdjustment** (Infrastructure) already exist; you only need to wire them in DI and switch ThermalAdjustmentService to use the interface.

---

## 2. Step 1 – Register IThermalAdjustment in DI

**File:** `Cardano API/Extensions/ServiceExtensions.cs`

**Add** the registration for the computation abstraction (e.g. after the thermal calculation engine):

```csharp
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Application.Services;
using Cardano.Infrastructure.Computation;

namespace Cardano_API.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            // ... existing registrations ...

            // Thermal Calculation
            services.AddScoped<IThermalComputationEngine, ThermokeyComputationEngine>();

            // Thermal Adjustment (capacity, fan, energy analysis) – implementation uses Cardano.Computation
            services.AddScoped<IThermalAdjustment, ThermalAdjustment>();

            // Adjustment Calculation (application service)
            services.AddScoped<IThermalAdjustmentService, ThermalAdjustmentService>();

            // ... rest ...
            return services;
        }
    }
}
```

**Note:** `ThermalAdjustment` (Infrastructure) already takes `IUnitTypeConverterRepository` in its constructor; DI will resolve it from your existing repository registration. No change needed in `ThermalAdjustment.cs`.

---

## 3. Step 2 – Refactor ThermalAdjustmentService to Use IThermalAdjustment

**File:** `Cardano.Application/Services/ThermalAdjustmentService.cs`

### 3.1 Remove

- `using Cardano.Computation;`
- Fields: `_adjustmentCapacity`, `_adjustmentFan`, `_eAnalysis`
- Constructor parameter: `IUnitTypeConverterRepository unitTypeConverter`
- Constructor body: the three lines that create `AdjustmentCapacity`, `AdjustmentFan`, `EAnalysis`

### 3.2 Add

- `using Cardano.Application.Interfaces.Computation;`
- Field: `private readonly IThermalAdjustment _thermalAdjustment;`
- Constructor parameter: `IThermalAdjustment thermalAdjustment`
- In constructor: `_thermalAdjustment = thermalAdjustment;`

### 3.3 Replace method bodies

Use the interface methods instead of the VB types. Domain types (`AdjustQuery`, `EAQuery`, `IList<Condenser>`) stay the same; only the call target changes.

**Full sample – refactored ThermalAdjustmentService.cs:**

```csharp
using AutoMapper;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;
using Microsoft.Extensions.Logging;

namespace Cardano.Application.Services
{
    public class ThermalAdjustmentService : IThermalAdjustmentService
    {
        private readonly IThermalAdjustment _thermalAdjustment;
        private readonly ICondenserRepository _condenserRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ThermalAdjustmentService> _logger;

        public ThermalAdjustmentService(
            ICondenserRepository condenserRepository,
            IThermalAdjustment thermalAdjustment,
            IMapper mapper,
            ILogger<ThermalAdjustmentService> logger)
        {
            _condenserRepository = condenserRepository;
            _thermalAdjustment = thermalAdjustment;
            _mapper = mapper;
            _logger = logger;
        }

        public AdjustQuery adjustMap(ThermalAdjustmentRequest dto)
        {
            return new AdjustQuery
            {
                ModelId = dto.ModelId,
                RemoteModel = dto.RemoteModel,
                RefrigerantType = dto.RefrigerantType,
                UnitsType = dto.UnitsType,
                Condensing = dto.Condensing,
                PercentAdjustment = dto.PercentAdjustment,
                Compressor = dto.Compressor,
                SubCooling = dto.SubCooling,
                DryBulb = dto.DryBulb,
                AtmosphericPress = dto.AtmosphericPress,
            };
        }

        public EAQuery EAMap(EAnalysisRequest dto)
        {
            return new EAQuery
            {
                CondenserId = dto.CondenserId,
                CondenserModel = dto.CondenserModel,
                IsCalculateCapacity = dto.IsCalculateCapacity,
                IsCalculateAirFlow = dto.IsCalculateAirFlow,
                IsSingleCaculation = dto.IsSingleCaculation,
                IntEACurrentFixCapacity = dto.IntEACurrentFixCapacity,
                IntEANewFixCapacity = dto.IntEANewFixCapacity,
                IntEAStartingAir = dto.IntEAStartingAir,
                IntEAInletAirTemp = dto.IntEAInletAirTemp,
                IntEAFinalAir = dto.IntEAFinalAir,
                IntEAStep = dto.IntEAStep,
                IntEADistance = dto.IntEADistance,
                IntEACondensingTemp = dto.IntEACondensingTemp,
                Distance = dto.Distance,
                FlowDirection = dto.FlowDirection,
                refRigerantType = dto.refRigerantType,
                AirflowRate = dto.AirflowRate,
                Rpm = dto.Rpm,
                NoOfFans = dto.NoOfFans,
                Power = dto.Power,
                CurrentFan = dto.CurrentFan,
                TubeVolume = dto.TubeVolume,
                Weight = dto.Weight,
                DiameterInlet = dto.DiameterInlet,
                DiameterOutlet = dto.DiameterOutlet,
                Price = dto.Price,
                SubCooling = dto.SubCooling,
                Compressor = dto.Compressor,
                AtmPressureInMetric = dto.AtmPressureInMetric,
                Condensing = dto.Condensing,
                DryBulb = dto.DryBulb
            };
        }

        public async Task<List<ThermalAdjustCapacityResponse>> GetCapacityAdjustmentAsync(ThermalAdjustmentRequest dto)
        {
            try
            {
                _logger.LogInformation("Starting capacity adjustment calculation for ModelId: {ModelId}, RemoteModel: {RemoteModel}",
                    dto.ModelId, dto.RemoteModel);

                var con = (await _condenserRepository.GetAllCondenser()).ToList();
                var adjResponse = adjustMap(dto);

                var result = _thermalAdjustment.GetCapacityAdjustmentAsync(con, adjResponse);
                var response = _mapper.Map<List<ThermalAdjustCapacityResponse>>(result);

                _logger.LogInformation("Successfully completed capacity adjustment calculation. Results count: {Count}",
                    response.Count);

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while calculating capacity adjustment. ModelId: {ModelId}, RemoteModel: {RemoteModel}, RefrigerantType: {RefrigerantType}",
                    dto.ModelId, dto.RemoteModel, dto.RefrigerantType);
                throw;
            }
        }

        public async Task<List<EAnalysisResponse>> GetEAnalysisAsync(EAnalysisRequest dto)
        {
            try
            {
                var con = (await _condenserRepository.GetAllCondenser()).ToList();
                var eAResponse = EAMap(dto);

                var result = _thermalAdjustment.GetEAnalysisAsync(con, eAResponse);
                var response = _mapper.Map<List<EAnalysisResponse>>(result);

                _logger.LogInformation("Successfully completed Energy Analysis calculation. Results count: {Count}",
                    response.Count);

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while calculating fan adjustment. ");
                throw;
            }
        }

        public async Task<List<ThermalAdjustFanResponse>> GetFanAdjustmentAsync(ThermalAdjustmentRequest dto)
        {
            try
            {
                var con = (await _condenserRepository.GetAllCondenser()).ToList();
                var adjResponse = adjustMap(dto);

                var result = _thermalAdjustment.GetFanAdjustmentAsync(con, adjResponse);
                var response = _mapper.Map<List<ThermalAdjustFanResponse>>(result);

                _logger.LogInformation("Successfully completed fan adjustment calculation. Results count: {Count}",
                    response.Count);

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while calculating fan adjustment. ModelId: {ModelId}, RemoteModel: {RemoteModel}, RefrigerantType: {RefrigerantType}",
                    dto.ModelId, dto.RemoteModel, dto.RefrigerantType);
                throw;
            }
        }
    }
}
```

**Summary of call changes:**

| Before | After |
|--------|--------|
| `_adjustmentCapacity.GetCapacityAdjustment(con, adjResponse)` | `_thermalAdjustment.GetCapacityAdjustmentAsync(con, adjResponse)` |
| `_eAnalysis.GetCalculateEnergyAnalysis(con, eAResponse)` | `_thermalAdjustment.GetEAnalysisAsync(con, eAResponse)` |
| `_adjustmentFan.GetFanFlowAdjustment(con, adjResponse)` | `_thermalAdjustment.GetFanAdjustmentAsync(con, adjResponse)` |

---

## 4. Step 3 – Remove Cardano.Computation and InstinctCodeII from Application

### 4.1 Clean up ThermalCalcService usings (optional but recommended)

**File:** `Cardano.Application/Services/ThermalCalcService.cs`

Remove these lines if they are still present and unused:

- `using Cardano.Computation;`
- `using static InstinctCodeII.Units;`

ThermalCalcService should only use **IUnitTypeConverterRepository**; no direct reference to the VB project or InstinctCodeII.

### 4.2 Remove project references from Application .csproj

**File:** `Cardano.Application/Cardano.Application.csproj`

**Remove** the following so the Application project no longer references the VB project or the InstinctCodeII DLL:

```xml
<!-- REMOVE these ItemGroups from Cardano.Application.csproj -->

<ItemGroup>
  <ProjectReference Include="..\Cardano.Computation\Cardano.Computation.vbproj" />
</ItemGroup>

<ItemGroup>
  <Reference Include="InstinctCodeII">
    <HintPath>..\Cardano.Computation\InstinctCodeII\InstinctCodeII.dll</HintPath>
  </Reference>
</ItemGroup>
```

After removal, **Cardano.Application** should only reference **Cardano.Domain** (and packages). Infrastructure and API keep references to Cardano.Computation and InstinctCodeII where needed.

---

## 5. Checklist

| Step | Action | File(s) |
|------|--------|--------|
| 1 | Register **IThermalAdjustment → ThermalAdjustment** in DI | `Cardano API/Extensions/ServiceExtensions.cs` |
| 2 | In ThermalAdjustmentService: inject **IThermalAdjustment**; remove **AdjustmentCapacity**, **AdjustmentFan**, **EAnalysis** and **IUnitTypeConverterRepository**; call **GetCapacityAdjustmentAsync**, **GetEAnalysisAsync**, **GetFanAdjustmentAsync** on the injected interface | `Cardano.Application/Services/ThermalAdjustmentService.cs` |
| 3 | Remove unused **Cardano.Computation** and **InstinctCodeII** usings from ThermalCalcService (if any) | `Cardano.Application/Services/ThermalCalcService.cs` |
| 4 | Remove **Cardano.Computation** and **InstinctCodeII** project/reference from **Cardano.Application.csproj** | `Cardano.Application/Cardano.Application.csproj` |

---

## 6. Verification

After applying the changes:

1. **Build** – Solution builds with no errors.
2. **Application layer** – No `using Cardano.Computation` or `using InstinctCodeII` in any Application .cs file; Application.csproj has no reference to Cardano.Computation or InstinctCodeII.
3. **Infrastructure** – Still references Cardano.Computation and InstinctCodeII; **ThermalAdjustment** and **UnitConversionRepository** implement the interfaces used by Application.
4. **Run** – Call GetCapacityAdjustment, GetFanAdjustment, GetEnergyAnalysis (and any other thermal adjustment endpoints) and confirm behavior is unchanged.

---

## 7. Resulting dependency flow

```
API          → Application, Infrastructure
Application  → Domain only (no Cardano.Computation, no InstinctCodeII)
Infrastructure → Application, Domain, Cardano.Computation, InstinctCodeII
Domain       → (no external computation references)
```

This gives you **~90% Clean Architecture**: Domain and Application are free of computation/implementation details; only Infrastructure talks to Cardano.Computation and InstinctCodeII.
