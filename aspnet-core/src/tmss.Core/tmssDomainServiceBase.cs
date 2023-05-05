using Abp.Domain.Services;

namespace tmss
{
    public abstract class tmssDomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected tmssDomainServiceBase()
        {
            LocalizationSourceName = tmssConsts.LocalizationSourceName;
        }
    }
}
