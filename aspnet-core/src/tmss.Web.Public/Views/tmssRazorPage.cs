using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace tmss.Web.Public.Views
{
    public abstract class tmssRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected tmssRazorPage()
        {
            LocalizationSourceName = tmssConsts.LocalizationSourceName;
        }
    }
}
