using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Requests
{
    //public class GetCurrentStepsRequest
    //{
    //    public int selection_id { get; set; }
    //}
    public class DeleteStepsRequest
    {
        public int thermal_id { get; set; }
    }

    //public class GetCondenserAndAccessoriesStepsRequest
    //{
    //    public int selection_id { get; set; }
    //    public string status { get; set; } = string.Empty;
    //}

    public class CreateStepsRequest
    {
        public object? Data { get; set; }

        public string? Status { get; set; }

        public int User_id { get; set; }
      
        public int Selection_id { get; set; }

        public string? Macro_serie { get; set; }

    }
}
