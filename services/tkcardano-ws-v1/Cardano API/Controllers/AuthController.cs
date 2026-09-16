using Cardano.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ICognitoAuthService _service;

        public AuthController(ICognitoAuthService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet("TokenDetails")] //GetBearerDetails
        public async Task<IActionResult> GetBearerDetails() => Ok(await _service.GetBearerDetails());
    }
}