using System.Threading.Tasks;
using Abp.Application.Services;
using tmss.Install.Dto;

namespace tmss.Install
{
    public interface IInstallAppService : IApplicationService
    {
        Task Setup(InstallDto input);

        AppSettingsJsonDto GetAppSettingsJson();

        CheckDatabaseOutput CheckDatabase();
    }
}