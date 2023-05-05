using Abp.Application.Services;
using Abp.Application.Services.Dto;
using tmss.Authorization.Permissions.Dto;

namespace tmss.Authorization.Permissions
{
    public interface IPermissionAppService : IApplicationService
    {
        ListResultDto<FlatPermissionWithLevelDto> GetAllPermissions();
    }
}
