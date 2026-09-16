using Cardano.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Interfaces
{
    public interface IThermalTypesRepository
    {
        Task<IEnumerable<CondenserType>> GetAllCondenserType();

        Task<IEnumerable<FanConnection>> GetAllFanConnection();

        Task<IEnumerable<CondenserRefType>> GetAllCondenserRefType();
    }
}
