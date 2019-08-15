using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace SiteTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaptchaImageController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        public CaptchaImageController(IConfiguration configuration,
            IEmailSender emailSender)
        {
            _configuration = configuration;
            _emailSender = emailSender;
        }
        [HttpPost("post-guid-captcha")]
        public async Task<IActionResult> GuidCaptcha()
        {
            await _emailSender.SendEmailAsync("novakvova@gmail.com", "Confirm Email",
               $"Please confirm your email by clicking here: " +
               $"<a href='jon.jpg'>link</a>");
            return Ok(new { semen = "Peter" });
        }
    }
}