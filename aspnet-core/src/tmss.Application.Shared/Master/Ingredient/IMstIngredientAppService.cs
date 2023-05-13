using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.Master.Ingredient.Dto;

namespace tmss.Master.Ingredient
{
    public interface IMstIngredientAppService : IApplicationService
    {
        Task<PagedResultDto<MstIngredientDto>> GetAll(GetMstIngredientInput input);

        Task CreateOrEdit(CreateOrEditMstIngredientDto input);

        Task Delete(EntityDto input);
    }
}
