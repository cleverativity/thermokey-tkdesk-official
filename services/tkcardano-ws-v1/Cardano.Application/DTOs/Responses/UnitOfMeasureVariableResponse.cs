using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    public class UnitOfMeasureVariableResponse
    {
        public int Id { get; set; }
        public string? Step { get; set; }
        public string? Section { get; set; }
        public string? Variable { get; set; }
        public IReadOnlyList<int> UnitIds { get; set; } = [];
    }
}
