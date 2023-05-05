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
using tmss.Master.Table.Dto;
using tmss.tmss.Master;


namespace tmss.Master.Dish
{
    public class MstSleDishAppService : tmssAppServiceBase, IMstDishAppService
    {
        private readonly IRepository<MstDishAppService, long> _mstDishAppService;
        public MstSleDishAppService(IRepository<MstDishAppService, long> mstDishAppService)
        {
            _mstDishAppService = mstDishAppService;
        }

        public async Task CreateOrEdit(CreateOrEditMstDishDto input)
        {
            if (input.Id == null) await Create(input);
            else await Update(input);
        }

        //CREATE
        private async Task Create(CreateOrEditMstDishDto input)
        {
            var mainObj = ObjectMapper.Map<MstTableAppService>(input);

            await CurrentUnitOfWork.GetDbContext<tmssDbContext>().AddAsync(mainObj);
        }

        // EDIT
        private async Task Update(CreateOrEditMstDishDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var mainObj = await _mstDishAppService.GetAll()
                .FirstOrDefaultAsync(e => e.Id == input.Id);

                var mainObjToUpdate = ObjectMapper.Map(input, mainObj);
            }
        }

        public async Task Delete(EntityDto input)
        {
            var mainObj = await _mstDishAppService.FirstOrDefaultAsync(input.Id);
            CurrentUnitOfWork.GetDbContext<tmssDbContext>().Remove(mainObj);
        }

        public async Task<PagedResultDto<MstDishDto>> GetAll(GetMstDishInput input)
        {
            var filtered = _mstDishAppService.GetAll()
                .WhereIf(!string.IsNullOrWhiteSpace(input.DishName), e => e.DishName.Contains(input.DishName))
                .WhereIf(!string.IsNullOrWhiteSpace(input.Price), e => e.Price.Contains(input.Price))

                ;
            var pageAndFiltered = filtered.OrderBy(s => s.Id);


            var system = from o in pageAndFiltered
                         select new MstDishDto
                         {
                             Id = o.Id,
                             DishName = o.DishName,
                             Price = o.Price,
                             UnitDish = o.UnitDish,
                             DishType = o.DishType,
                             ImageDish = o.ImageDish,
                             StatusDish = o.StatusDish
                         };

            var totalCount = await filtered.CountAsync();
            var paged = system.PageBy(input);

            return new PagedResultDto<MstDishDto>(
                totalCount,
                 await paged.ToListAsync()
            );
        }

    }
}
