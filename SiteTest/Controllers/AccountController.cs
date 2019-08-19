using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SiteTest.Helpers;

namespace SiteTest.Controllers
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string CaptchaText { get; set; }
        public string CaptchaKey { get; set; }
    }
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public AccountController()
        {

        }
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterViewModel model)
        {
            if (!CaptchaHelper.VerifyAndExpireSolution(this.HttpContext, model.CaptchaKey,
               model.CaptchaText))
            {
                var invalid = new Dictionary<string, string>();
                invalid.Add("captchaText", "Помилка вводу зображення на фото");
                return BadRequest(invalid);
            }
            return Ok();
        }
    }
}