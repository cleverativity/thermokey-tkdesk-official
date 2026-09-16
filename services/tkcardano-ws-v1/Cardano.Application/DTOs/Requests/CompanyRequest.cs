using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Cardano.Application.DTOs.Requests
{
    public class CompanyRequest
    {
        public int Id { get; set; }
        public string company { get; set; } = string.Empty;
        public string attention_of { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
        public string telephone { get; set; } = string.Empty;
        public string fax { get; set; } = string.Empty;
        public DateTime? AppDate { get; set; } = null;
        public string software_version { get; set; } = string.Empty;
        public string offer_no { get; set; } = string.Empty;
        public string reference { get; set; } = string.Empty;

    }
}
