using Cardano.Domain.Entities;
using Cardano.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Interfaces
{
    public interface IThermalStepsRepository
    {
        Task<IEnumerable<CurrentStep>> GetCurrentStepsAsync(int selection_id);
        Task<IEnumerable<CondenserSteps>> GetCondenserAccessoriesAsync(int selection_id, string status);
        Task<CondenserSteps> AddAsync(CondenserSteps comp);
        Task<bool> DeleteAsync(Int32 id);
    }
}
