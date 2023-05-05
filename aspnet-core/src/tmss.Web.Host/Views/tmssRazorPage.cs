using Abp.AspNetCore.Mvc.Views;

namespace tmss.Web.Views
{
    public abstract class tmssRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected tmssRazorPage()
        {
            LocalizationSourceName = tmssConsts.LocalizationSourceName;
        }
    }
}
