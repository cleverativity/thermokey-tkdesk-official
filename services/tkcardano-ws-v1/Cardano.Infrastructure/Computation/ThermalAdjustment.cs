using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Computation;
using Cardano.Computation;
using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Infrastructure.Computation
{
    public class ThermalAdjustment : IThermalAdjustmentRepository
    {
        private readonly AdjustmentCapacity _adjustmentCapacity;
        private readonly AdjustmentFan _adjustmentFan;
        private readonly EAnalysis _eAnalysis;

        public ThermalAdjustment(IUnitTypeConverterRepository unitTypeConverter)
        {
            _adjustmentCapacity = new AdjustmentCapacity(unitTypeConverter);
            _adjustmentFan = new AdjustmentFan(unitTypeConverter);
            _eAnalysis = new EAnalysis();
        }

        public IList<AdjustCapacityResult> GetCapacityAdjustmentAsync(IList<Condenser> condensers, AdjustQuery query)
        {
            return _adjustmentCapacity.GetCapacityAdjustment(condensers.ToList(), query);
        }

        public IList<EAResult> GetEAnalysisAsync(IList<Condenser> condensers, EAQuery query)
        {
            return _eAnalysis.GetCalculateEnergyAnalysis(condensers.ToList(), query);
        }

        public IList<AdjustFanResult> GetFanAdjustmentAsync(IList<Condenser> condensers, AdjustQuery query)
        {
            return _adjustmentFan.GetFanFlowAdjustment(condensers.ToList(), query);
        }
    }
}