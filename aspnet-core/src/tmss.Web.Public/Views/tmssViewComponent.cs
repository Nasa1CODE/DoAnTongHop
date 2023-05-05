using Abp.AspNetCore.Mvc.ViewComponents;

namespace tmss.Web.Public.Views
{
    public abstract class tmssViewComponent : AbpViewComponent
    {
        protected tmssViewComponent()
        {
            LocalizationSourceName = tmssConsts.LocalizationSourceName;
        }
    }
}