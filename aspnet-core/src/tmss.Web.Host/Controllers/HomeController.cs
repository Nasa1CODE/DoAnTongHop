using Abp.Auditing;
using Microsoft.AspNetCore.Mvc;

namespace tmss.Web.Controllers
{
    public class HomeController : tmssControllerBase
    {
        [DisableAuditing]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Ui");
        }
    }
}
