using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.Master.Employee.Dto;

namespace tmss.Master.Employee
{
    public  interface IMstEmployeeAppService :  IApplicationService
    {
        Task<PagedResultDto<MstEmployeeDto>> GetAll(GetMstEmployeeInput input);

        Task CreateOrEdit(CreateOrEditMstEmployeeDto input);

        Task Delete(EntityDto input);
    }
}
