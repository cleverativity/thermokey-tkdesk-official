using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Cardano.Domain.Models
{
    public class CurrentStep
    {
        public int Id { get; set; }
        public string? status { get; set; }
        public int user_id { get; set; }
        public string? macro_serie { get; set; }
        public int thermal_id { get; set; }
    }
}
