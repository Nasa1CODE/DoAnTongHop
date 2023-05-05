using Abp.Application.Services;
using tmss.Dto;
using tmss.Logging.Dto;

namespace tmss.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
