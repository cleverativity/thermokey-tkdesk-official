using Cardano.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    public class AccessoriesSelectedResponse
    {
        public int Id { get; set; }
        public string? RemoteModel { get; set; }
        public double AccessoriesPrice { get; set; }
        public double UnitPrice { get; set; }
        public double Discount { get; set; }
        public double UnitDiscount { get; set; }
        public double AccessoriesDiscount { get; set; }
        public double TotalNetPrice { get; set; }
        public List<AccessoriesItem>? AccessoriesItems { get; set; }
        public List<AccessoryCatalogItem>? AvailableAccessories { get; set; }
    }

    public class AccessoriesItem
    {
        public string? Item { get; set; }
        public decimal Price { get; set; }
    }

    public class AccessoriesWithPriceResponse
    {
        public int Id { get; set; }
        public string? RemoteModel { get; set; }
        public List<AccessoryCatalogItem>? AccessoriesItems { get; set; }
 
        //public List<AccessoryCatalogItem>? AvailableAccessories { get; set; }


    }


    public class AccessoryCatalogItem
    {
        public int Id { get; set; }
        public string? Item { get; set; }
        public double Price { get; set; }

    }
}
