using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    public class RemoteCondenserResponse
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? ModelName { get; set; }
        public double Capacity { get; set; }
        public double Airflow { get; set; }
        public double Spl { get; set; }
        public double SoundPower { get; set; }
        public int No_Fans { get; set; }
        public int Rpm { get; set; }
        public double Power { get; set; }
        public double Current_a { get; set; }
        public double Internal_Volume { get; set; }
        public double Weights { get; set; }
        public string? Inlet_Connection { get; set; }
        public string? Outlet_Connection { get; set; }
        public double Price { get; set; }
    }
    public class PaginatedComputationResponse
    {
        public List<RemoteCondenserResponse>? Results { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }
}
