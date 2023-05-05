using Microsoft.AspNetCore.Mvc;
using tmss.Web.Controllers;

namespace tmss.Web.Public.Controllers
{
    public class AboutController : tmssControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}