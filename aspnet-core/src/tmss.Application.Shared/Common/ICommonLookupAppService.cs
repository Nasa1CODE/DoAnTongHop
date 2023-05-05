using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using tmss.Common.Dto;
using tmss.Editions.Dto;

namespace tmss.Common
{
    public interface ICommonLookupAppService : IApplicationService
    {
        Task<ListResultDto<SubscribableEditionComboboxItemDto>> GetEditionsForCombobox(bool onlyFreeItems = false);

        Task<PagedResultDto<NameValueDto>> FindUsers(FindUsersInput input);

        GetDefaultEditionNameOutput GetDefaultEditionName();
    }
}