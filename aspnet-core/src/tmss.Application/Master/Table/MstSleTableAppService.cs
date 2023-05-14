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
using tmss.Master.Table.Dto;
using tmss.tmss.Master;

namespace tmss.Master.Table
{
    public class MstSleTableAppService : tmssAppServiceBase, IMstTableAppService
    {
        private readonly IRepository<MstTableAppService, long> _mstTableAppService;
        public MstSleTableAppService(
           IRepository<MstTableAppService, long> mstTableAppService
           )
        {
            _mstTableAppService = mstTableAppService;
        }


        public async Task CreateOrEdit(CreateOrEditMstTableDto input)
        {
            if (input.Id == null) await Create(input);
            else await Update(input);
        }

        //CREATE
        private async Task Create(CreateOrEditMstTableDto input)
        {
         
            var newRecord = ObjectMapper.Map<MstTableAppService>(input);
            await _mstTableAppService.InsertAsync(newRecord);
        }

        // EDIT
        private async Task Update(CreateOrEditMstTableDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var mainObj = await _mstTableAppService.GetAll()
                .FirstOrDefaultAsync(e => e.Id == input.Id);

                var mainObjToUpdate = ObjectMapper.Map(input, mainObj);
            }
        }

        public async Task Delete(EntityDto input)
        {
            var mainObj = await _mstTableAppService.FirstOrDefaultAsync(input.Id);
            CurrentUnitOfWork.GetDbContext<tmssDbContext>().Remove(mainObj);
        }

        public async Task<PagedResultDto<MstTableDto>> GetAll(GetMstTableInput input)
        {
            var filtered = _mstTableAppService.GetAll()
                .WhereIf(!string.IsNullOrWhiteSpace(input.TableName), e => e.TableName.Contains(input.TableName))
                .WhereIf(!string.IsNullOrWhiteSpace(input.TableType), e => e.TableType.Contains(input.TableType))

                ;
            var pageAndFiltered = filtered.OrderBy(s => s.Id);


            var system = from o in pageAndFiltered
                         select new MstTableDto
                         {
                             Id = o.Id,
                             TableName = o.TableName,
                             TableType = o.TableType,
                             StatusTable = o.StatusTable,
                             AmountPeople = o.AmountPeople
                         };

            var totalCount = await filtered.CountAsync();
            var paged = system.PageBy(input);

            return new PagedResultDto<MstTableDto>(
                totalCount,
                 await paged.ToListAsync()
            );
        }



    }
}
