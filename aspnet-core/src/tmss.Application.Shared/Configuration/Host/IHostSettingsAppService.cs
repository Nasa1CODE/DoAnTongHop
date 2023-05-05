using System.Threading.Tasks;
using Abp.Application.Services;
using tmss.Configuration.Host.Dto;

namespace tmss.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
