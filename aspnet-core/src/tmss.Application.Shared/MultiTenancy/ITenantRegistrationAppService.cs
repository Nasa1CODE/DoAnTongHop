using System.Threading.Tasks;
using Abp.Application.Services;
using tmss.Editions.Dto;
using tmss.MultiTenancy.Dto;

namespace tmss.MultiTenancy
{
    public interface ITenantRegistrationAppService: IApplicationService
    {
        Task<RegisterTenantOutput> RegisterTenant(RegisterTenantInput input);

        Task<EditionsSelectOutput> GetEditionsForSelect();

        Task<EditionSelectDto> GetEdition(int editionId);
    }
}