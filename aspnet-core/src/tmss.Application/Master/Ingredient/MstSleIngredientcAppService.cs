using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.EntityFrameworkCore.Uow;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using tmss.EntityFrameworkCore;
using tmss.Master.Dish.Dto;
using tmss.Master.Employee.Dto;
using tmss.Master.Ingredient.Dto;
using tmss.Master.Table.Dto;
using tmss.tmss.Master;


namespace tmss.Master.Ingredient
{
    public class MstSleIngredientcAppService : tmssAppServiceBase, IMstIngredientAppService
    {
        private readonly IRepository<MstIngredientcAppService, long> _mstIngredientcAppService;
        public MstSleIngredientcAppService(IRepository<MstIngredientcAppService, long> mstIngredientcAppService)
        {
            _mstIngredientcAppService = mstIngredientcAppService;
        }

        public async Task CreateOrEdit(CreateOrEditMstIngredientDto input)
        {
            if (input.Id == null) await Create(input);
            else await Update(input);
        }

        //CREATE
        private async Task Create(CreateOrEditMstIngredientDto input)
        {
            var mainObj = ObjectMapper.Map<MstEmployeeAppService>(input);

            await CurrentUnitOfWork.GetDbContext<tmssDbContext>().AddAsync(mainObj);
        }

        // EDIT
        private async Task Update(CreateOrEditMstIngredientDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var mainObj = await _mstIngredientcAppService.GetAll()
                .FirstOrDefaultAsync(e => e.Id == input.Id);

                var mainObjToUpdate = ObjectMapper.Map(input, mainObj);
            }
        }

        public async Task Delete(EntityDto input)
        {
            var mainObj = await _mstIngredientcAppService.FirstOrDefaultAsync(input.Id);
            CurrentUnitOfWork.GetDbContext<tmssDbContext>().Remove(mainObj);
        }

        public async Task<PagedResultDto<MstIngredientDto>> GetAll(GetMstIngredientInput input)
        {
            var filtered = _mstIngredientcAppService.GetAll()
                .WhereIf(!string.IsNullOrWhiteSpace(input.IngredientName), e => e.IngredientName.Contains(input.IngredientName))
                .WhereIf(!string.IsNullOrWhiteSpace(input.UnitIngredient), e => e.UnitIngredient.Contains(input.UnitIngredient));      
            var pageAndFiltered = filtered.OrderBy(s => s.Id);


            var system = from o in pageAndFiltered
                         select new MstIngredientDto
                         {
                             Id = o.Id,
                             IngredientName = o.IngredientName,
                             UnitIngredient = o.UnitIngredient,
                             QuantityIngredient = o.QuantityIngredient
                         };

            var totalCount = await filtered.CountAsync();
            var paged = system.PageBy(input);

            return new PagedResultDto<MstIngredientDto>(
                totalCount,
                 await paged.ToListAsync()
            );
        }
    }
}
