using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.Master.Table.Dto;

namespace tmss.Master.Table
{
    public interface IMstTableAppService : IApplicationService
    {
        Task<PagedResultDto<MstTableDto>> GetAll(GetMstTableInput input);

        Task CreateOrEdit(CreateOrEditMstTableDto input);

        Task Delete(EntityDto input);

    }
}
