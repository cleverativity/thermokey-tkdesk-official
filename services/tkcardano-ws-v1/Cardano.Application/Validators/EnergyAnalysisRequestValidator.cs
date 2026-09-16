using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class EnergyAnalysisRequestValidator : AbstractValidator<EAnalysisRequest>
    {
        public EnergyAnalysisRequestValidator()
        {
            // CondenserId: Should be greater than 0
            RuleFor(e => e.CondenserId)
                .NotNull().WithMessage("ModelId is required.")
                .GreaterThan(0).WithMessage("CondenserId must be greater than 0.");

            // CondenserModel: Should not be empty
            RuleFor(e => e.CondenserModel)
                .NotEmpty().WithMessage("CondenserModel is required.");

            // IsCalculateCapacity: Should not be null
            RuleFor(e => e.IsCalculateCapacity)
                .NotNull().WithMessage("IsCalculateCapacity is required.");

            // IsCalculateAirFlow: Should not be null
            RuleFor(e => e.IsCalculateAirFlow)
                .NotNull().WithMessage("IsCalculateAirFlow is required.");

            // IsSingleCalculation: Should not be null
            RuleFor(e => e.IsSingleCaculation)
                .NotNull().WithMessage("IsSingleCaculation is required.");

            // IntEACurrentFixCapacity: Must be greater than 0
            RuleFor(e => e.IntEACurrentFixCapacity)
                  .NotNull().WithMessage("IntEACurrentFixCapacity is required.");

            // IntEANewFixCapacity: Must be greater than 0
            RuleFor(e => e.IntEANewFixCapacity)
                  .NotNull().WithMessage("IntEANewFixCapacity is required.");

            // IntEAStartingAir: Must be greater than 0
            RuleFor(e => e.IntEAStartingAir)
                  .NotNull().WithMessage("IntEAStartingAir is required.");

            // IntEAInletAirTemp: Must be greater than 0
            RuleFor(e => e.IntEAInletAirTemp)
              .NotNull().WithMessage("IntEAInletAirTemp is required.");

            // IntEAFinalAir: Must be greater than 0
            RuleFor(e => e.IntEAFinalAir)
                .NotNull().WithMessage("IntEAFinalAir is required.");

            // IntEAStep: Must be greater than 0
            RuleFor(e => e.IntEAStep)
                   .NotNull().WithMessage("IntEAStep is required.");

            // IntEADistance: Must be greater than 0
            RuleFor(e => e.IntEADistance)
                  .NotNull().WithMessage("IntEADistance is required.");

            // IntEACondensingTemp: Must be greater than 0
            RuleFor(e => e.IntEACondensingTemp)
                 .NotNull().WithMessage("IntEACondensingTemp is required.");

            // Distance: Must be greater than 0
            RuleFor(e => e.Distance)
                     .NotNull().WithMessage("Distance is required.");

            // FlowDirection: Should not be empty
            RuleFor(e => e.FlowDirection)
                 .NotNull().WithMessage("FlowDirection is required.");

            // refRigerantType: Should not be empty
            RuleFor(e => e.refRigerantType)
                .NotNull().WithMessage("refRigerantType is required.");

            // AirflowRate: Must be greater than 0
            RuleFor(e => e.AirflowRate)
                .NotNull().WithMessage("AirflowRate is required.");

            // Rpm: Must be greater than 0
            RuleFor(e => e.Rpm)
               .NotNull().WithMessage("Rpm is required.");

            // NoOfFans: Must be greater than 0
            RuleFor(e => e.NoOfFans)
                   .NotNull().WithMessage("NoOfFans is required.");

            // Power: Must be greater than 0
            RuleFor(e => e.Power)
                  .NotNull().WithMessage("Power is required.");

            // CurrentFan: Must be greater than 0
            RuleFor(e => e.CurrentFan)
                 .NotNull().WithMessage("CurrentFan is required.");

            // TubeVolume: Must be greater than 0
            RuleFor(e => e.TubeVolume)
               .NotNull().WithMessage("TubeVolume is required.");

            // Weight: Must be greater than 0
            RuleFor(e => e.Weight)
                 .NotNull().WithMessage("Weight is required.");

            // DiameterInlet: Should not be empty
            RuleFor(e => e.DiameterInlet)
                .NotNull().WithMessage("DiameterInlet is required.");

            // DiameterOutlet: Should not be empty
            RuleFor(e => e.DiameterOutlet)
                .NotNull().WithMessage("DiameterOutlet is required.");

            // Price: Must be greater than 0
            RuleFor(e => e.Price)
                .NotNull().WithMessage("Price is required.");

            // SubCooling: Must be greater than 0
            RuleFor(e => e.SubCooling)
                .NotNull().WithMessage("SubCooling is required.");

            // Compressor: Must be greater than 0
            RuleFor(e => e.Compressor)
                   .NotNull().WithMessage("Compressor is required.");

            // AtmPressureInMetric: Must be greater than 0
            RuleFor(e => e.AtmPressureInMetric)
                   .NotNull().WithMessage("AtmPressureInMetric is required.");

            // Condensing: Must be greater than 0
            RuleFor(e => e.Condensing)
                   .NotNull().WithMessage("Condensing is required.");

            // DryBulb: Must be greater than 0
            RuleFor(e => e.DryBulb)
                   .NotNull().WithMessage("DryBulb is required.");
        }
    }
}
