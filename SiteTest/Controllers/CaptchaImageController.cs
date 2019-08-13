using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SiteTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaptchaImageController : ControllerBase
    {
        [HttpPost("post-guid-captcha")]
        public IActionResult GuidCaptcha()
        {
            return Ok(new { semen = "Peter" });
        }
    }
}