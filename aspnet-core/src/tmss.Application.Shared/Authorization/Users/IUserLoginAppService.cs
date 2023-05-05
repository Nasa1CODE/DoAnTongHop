using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using tmss.Authorization.Users.Dto;

namespace tmss.Authorization.Users
{
    public interface IUserLoginAppService : IApplicationService
    {
        Task<ListResultDto<UserLoginAttemptDto>> GetRecentUserLoginAttempts();
    }
}
