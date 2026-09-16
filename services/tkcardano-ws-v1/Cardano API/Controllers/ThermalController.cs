using Cardano.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class ThermalController : ControllerBase
    {
        private readonly IThermalTypesService _service;

        public ThermalController(IThermalTypesService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet("CondenserModels")] //GetCondenserModel
        public async Task<IActionResult> GetCondenserModel() => Ok(await _service.GetAllCondenser());

        [Authorize]
        [HttpGet("CondenserTypes")] //GetCondenserTypes
        public async Task<IActionResult> GetAllCondenserTypes() => Ok(await _service.GetAllCondenserType());

        [Authorize]
        [HttpGet("FanConnections")] //GetFanConnection
        public async Task<IActionResult> GetFanConnection() => Ok(await _service.GetAllFanConnection());

        [Authorize]
        [HttpGet("RefTypes")] //GetRefType
        public async Task<IActionResult> GetRefType() => Ok(await _service.GetAllCondenserRefType());

        //[Authorize]
        [HttpGet("CoilGeometries")]
        public IActionResult GetCoilGeometries() => Ok(_service.GetCoilGeometries());
    }
}