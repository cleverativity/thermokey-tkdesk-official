using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Requests
{
    public class AccessoriesSelectedRequest
    {
        public int Id { get; set; }
        public string? RemoteModel { get; set; }
        public string? RefRigerantType { get; set; }
        public string? AirFlowDirection { get; set; }
        public double AccessoriesDiscount { get; set; }
        public double UnitDiscount { get; set; }
        public List<int>? SelectedItems { get; set; }
        public string? FansConnection { get; set; }

    }
}
