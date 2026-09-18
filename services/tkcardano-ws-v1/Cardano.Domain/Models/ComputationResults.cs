using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Models
{
    public class ComputationResults
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? ModelName { get; set; }
        public double Capacity { get; set; }
        public double Airflow { get; set; }
        public double Spl { get; set; }
        public double SoundPower { get; set; }
        public double No_fans { get; set; }

        public double Rpm { get; set; }
        public double Power { get; set; }
        public double Current_a { get; set; }
        public double Internal_volume { get; set; }
        public double Weights { get; set; }
        public string? Inlet_connection { get; set; }
        public string? Outlet_connection { get; set; }
        public double Price { get; set; }
    }
    public class PaginatedCondenserResult
    {
        public List<ComputationResults>? Results { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }
}
