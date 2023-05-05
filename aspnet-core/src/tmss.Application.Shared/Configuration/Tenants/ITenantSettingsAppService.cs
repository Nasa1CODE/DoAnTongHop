using System.Threading.Tasks;
using Abp.Application.Services;
using tmss.Configuration.Tenants.Dto;

namespace tmss.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);

        Task ClearLogo();

        Task ClearCustomCss();
    }
}
