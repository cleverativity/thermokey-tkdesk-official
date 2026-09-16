using Cardano.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cardano.Domain.Interfaces
{
    public interface ICondenserRepository
    {
        Task<IEnumerable<Condenser>> GetAllCondenser();
    }
}

