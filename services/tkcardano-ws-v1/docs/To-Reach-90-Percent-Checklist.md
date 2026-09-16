# Checklist: Files to Add, Update, or Delete to Reach ~90% Clean Architecture

Use this list to reach ~90%. **No new projects or new files are required**—only updates and one .csproj edit. The interface **IThermalAdjustment** and implementation **ThermalAdjustment** already exist.

---

## 1. Summary

| Action | Count | Purpose |
|--------|--------|--------|
| **ADD** | 0 files | Nothing to add. |
| **UPDATE** | 3 files | Wire IThermalAdjustment, stop using VB types in Application, remove unused usings. |
| **DELETE** | 0 files | Nothing to delete. |
| **EDIT .csproj** | 1 file | Remove Cardano.Computation and InstinctCodeII from Application. |

---

## 2. UPDATE – Files to change

### 2.1 UPDATE: `Cardano API/Extensions/ServiceExtensions.cs`

**Purpose:** Register IThermalAdjustment so ThermalAdjustmentService can receive it via DI.

**Do this:** Add one line after the Thermal Calculation registration.

**Location:** After
`services.AddScoped<IThermalComputationEngine, ThermokeyComputationEngine>();`

**Add:**
```csharp
services.AddScoped<IThermalAdjustment, ThermalAdjustment>();
```

So the block looks like:
```csharp
// Thermal Calculation
services.AddScoped<IThermalComputationEngine, ThermokeyComputationEngine>();

// Thermal Adjustment (implementation in Infrastructure uses VB Cardano.Computation)
services.AddScoped<IThermalAdjustment, ThermalAdjustment>();

// Adjustment Calculation (application service)
services.AddScoped<IThermalAdjustmentService, ThermalAdjustmentService>();
```

---

### 2.2 UPDATE: `Cardano.Application/Services/ThermalAdjustmentService.cs`

**Purpose:** Stop referencing VB types (AdjustmentCapacity, AdjustmentFan, EAnalysis) from Application; use the C# interface IThermalAdjustment only.

**Do this:**

1. **Remove**
   - `using Cardano.Computation;`
   - Fields: `_adjustmentCapacity`, `_adjustmentFan`, `_eAnalysis`
   - Constructor parameter: `IUnitTypeConverterRepository unitTypeConverter`
   - In constructor body: the three lines that `new` AdjustmentCapacity, AdjustmentFan, EAnalysis

2. **Add**
   - Field: `private readonly IThermalAdjustment _thermalAdjustment;`
   - Constructor parameter: `IThermalAdjustment thermalAdjustment`
   - In constructor: `_thermalAdjustment = thermalAdjustment;`

3. **Replace calls**
   - `_adjustmentCapacity.GetCapacityAdjustment(con, adjResponse)`
     → `_thermalAdjustment.GetCapacityAdjustmentAsync(con, adjResponse)`
   - `_eAnalysis.GetCalculateEnergyAnalysis(con, eAResponse)`
     → `_thermalAdjustment.GetEAnalysisAsync(con, eAResponse)`
   - `_adjustmentFan.GetFanFlowAdjustment(con, adjResponse)`
     → `_thermalAdjustment.GetFanAdjustmentAsync(con, adjResponse)`

Full sample for this file is in **`docs/Reach-90-Percent-CleanArchitecture-Sample.md`** (Section 3).

---

### 2.3 UPDATE: `Cardano.Application/Services/ThermalCalcService.cs`

**Purpose:** Remove unused references to Cardano.Computation and InstinctCodeII so Application can drop those references entirely.

**Do this:** Delete these two lines (they are unused; logic uses IUnitTypeConverterRepository):

- `using Cardano.Computation;`
- `using static InstinctCodeII.Units;`

---

## 3. EDIT .csproj (remove references)

### 3.1 EDIT: `Cardano.Application/Cardano.Application.csproj`

**Purpose:** Application layer must not reference the VB project or InstinctCodeII DLL.

**Do this:** Remove these two blocks from the file.

**Remove this block:**
```xml
<ItemGroup>
  <ProjectReference Include="..\Cardano.Computation\Cardano.Computation.vbproj" />
</ItemGroup>
```

**Remove this block:**
```xml
<ItemGroup>
  <Reference Include="InstinctCodeII">
    <HintPath>..\Cardano.Computation\InstinctCodeII\InstinctCodeII.dll</HintPath>
  </Reference>
</ItemGroup>
```

**Keep:** The `<ItemGroup>` that references `Cardano.Domain` and all `<PackageReference>` items.

**Important:** Do this step **only after** completing the updates in Section 2. Otherwise the Application project will fail to build (ThermalAdjustmentService or ThermalCalcService would still reference types from Cardano.Computation/InstinctCodeII).

---

## 4. ADD – New files

**None.** You do not need to create any new files. IThermalAdjustment and ThermalAdjustment already exist.

---

## 5. DELETE – Files to remove

**None.** Do not delete any files.

---

## 6. Order of work

| Step | File | Action |
|------|------|--------|
| 1 | `Cardano API/Extensions/ServiceExtensions.cs` | Add `services.AddScoped<IThermalAdjustment, ThermalAdjustment>();` |
| 2 | `Cardano.Application/Services/ThermalAdjustmentService.cs` | Refactor to use IThermalAdjustment; remove VB types and Cardano.Computation using |
| 3 | `Cardano.Application/Services/ThermalCalcService.cs` | Remove `using Cardano.Computation;` and `using static InstinctCodeII.Units;` |
| 4 | `Cardano.Application/Cardano.Application.csproj` | Remove Cardano.Computation ProjectReference and InstinctCodeII Reference |

---

## 7. Verify

After all steps:

1. **Build** the solution — it should build with no errors.
2. **Application** — No .cs file in Cardano.Application should contain `Cardano.Computation` or `InstinctCodeII`; Cardano.Application.csproj should not reference them.
3. **Run** — Call the adjustment endpoints (capacity, fan, energy analysis) and confirm behavior is unchanged.

---

## 8. Result

- **Application** will depend only on **Cardano.Domain** (and NuGet packages).
- **Infrastructure** will continue to reference Cardano.Computation and InstinctCodeII and implement IThermalAdjustment (and IUnitTypeConverterRepository).
- Your Clean Architecture score should reach **~90%.**
