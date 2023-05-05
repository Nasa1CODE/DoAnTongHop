using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.Master.Dish.Dto;

namespace tmss.Master.Dish
{
    public interface IMstDishAppService : IApplicationService
    {
        Task<PagedResultDto<MstDishDto>> GetAll(GetMstDishInput input);

        Task CreateOrEdit(CreateOrEditMstDishDto input);

        Task Delete(EntityDto input);
    }
}
