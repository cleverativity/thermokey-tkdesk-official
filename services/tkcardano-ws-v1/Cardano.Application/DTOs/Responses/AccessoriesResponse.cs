
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    public class AccessoriesResponse
    {
        public int Id { get; set; }
        public string? Item { get; set; }
        public Boolean IsDisabled { get; set; }
        public string? Type { get; set; }
    }

    public class AccessoriesGroupResponse
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; } = string.Empty;
        public List<AccessoriesResponse> Items { get; set; } = new();
    }
}
