using Cardano.Domain.Entities;
using Cardano.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Interfaces.Computation
{
    public interface IThermalAdjustmentRepository
    {
        IList<AdjustCapacityResult> GetCapacityAdjustmentAsync(
              IList<Condenser> condensers, AdjustQuery query);

        IList<AdjustFanResult> GetFanAdjustmentAsync(
            IList<Condenser> condensers, AdjustQuery query);

        IList<EAResult> GetEAnalysisAsync(
         IList<Condenser> condensers, EAQuery query);
    }
}