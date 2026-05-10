using Microsoft.AspNetCore.Mvc;
using DomainHealthToolkit.Api.Services;

namespace DomainHealthToolkit.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DomainHealthController : ControllerBase
    {
        private readonly DomainHealthService _service;

        public DomainHealthController(DomainHealthService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Check([FromQuery] string domain)
        {
           var result = await _service.CheckDomain(domain);
           return Ok(result);
        }
    }
}