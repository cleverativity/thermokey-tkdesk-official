using Cardano.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Interfaces
{
    public interface IAccessoriesRepository
    {
        Task<IEnumerable<AccessoriesItems>> GetAllAccessoriesItems();
        Task<IEnumerable<Accessories>> GetAllAccessories();

    }
}
