using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Interfaces.Repositories
{
    public interface IThermalTypesService
    {
        Task<IEnumerable<CondenserResponse>> GetAllCondenser();

        Task<IEnumerable<CondenserType>> GetAllCondenserType();

        Task<IEnumerable<FanConnection>> GetAllFanConnection();

        Task<IEnumerable<CondenserRefType>> GetAllCondenserRefType();

        IReadOnlyList<string> GetCoilGeometries();
    }
}
