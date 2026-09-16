using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Models
{
    public class AccessoriesDetails
    {

        public int Id { get; set; }
        public string? RemoteModel { get; set; }
        public double AccessoriesPrice { get; set; }
        public double UnitPrice { get; set; }
        public double Discount { get; set; }
        public double UnitDiscount { get; set; }
        public double AccessoriesDiscount { get; set; }
        public double TotalNetPrice { get; set; }
        public List<AccessoriesItemList>? AccessoriesItems { get; set; }
        //public List<AccessoryCatalogItem>? AvailableAccessories { get; set; }
    }

    public class AccessoriesWithPrice
    {
        public int Id { get; set; }
        public string? RemoteModel { get; set; }
        public List<AccessoriesItemList>? AccessoriesItems { get; set; }
        // add this
        //public List<AccessoryCatalogItem>? AvailableAccessories { get; set; }
    }


    public class AccessoriesItemList
    {
        public int Id { get; set; }
        public string? Item { get; set; }
        public double Price { get; set; }
    }



    //remove later

    public class AccessoryCatalogItem
    {
        public int Id { get; set; }
        public string? Item { get; set; }
        public double Price { get; set; }

    }
}
