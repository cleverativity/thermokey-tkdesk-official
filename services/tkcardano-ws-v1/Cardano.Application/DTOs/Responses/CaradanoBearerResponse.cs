using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    public class CaradanoBearerResponse
    {
        public string Sub { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;

        public string Iss { get; set; } = string.Empty;

        public string ExpClaim { get; set; } = string.Empty;

        public string ExpiresAt { get; set; } = string.Empty;
    }
}