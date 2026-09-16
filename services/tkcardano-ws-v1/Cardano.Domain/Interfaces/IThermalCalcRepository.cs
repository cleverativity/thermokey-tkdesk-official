using Cardano.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Interfaces
{
    public interface IThermalCalcRepository
    {
        Task<IEnumerable<Accessories>> GetAllAccessories();
    }
}
