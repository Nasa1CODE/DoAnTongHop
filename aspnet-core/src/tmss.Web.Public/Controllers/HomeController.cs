using Microsoft.AspNetCore.Mvc;
using tmss.Web.Controllers;

namespace tmss.Web.Public.Controllers
{
    public class HomeController : tmssControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}