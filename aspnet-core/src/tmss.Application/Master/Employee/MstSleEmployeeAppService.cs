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
using tmss.Master.Table.Dto;
using tmss.tmss.Master;

namespace tmss.Master.Employee
{
    public class MstSleEmployeeAppService : tmssAppServiceBase, IMstEmployeeAppService
    {
        private readonly IRepository<MstEmployeeAppService, long> _mstEmployeeAppService;
        public MstSleEmployeeAppService(IRepository<MstEmployeeAppService, long> mstEmployeeAppService)
        {
            _mstEmployeeAppService = mstEmployeeAppService;
        }

        public async Task CreateOrEdit(CreateOrEditMstEmployeeDto input)
        {
            if (input.Id == null)
            { 
                await Create(input); 
            }
            else {
                await Update(input);
            }
        }

        //CREATE
        private async Task Create(CreateOrEditMstEmployeeDto input)
        {
            var newRecord = ObjectMapper.Map<MstEmployeeAppService>(input);
            await _mstEmployeeAppService.InsertAsync(newRecord);

        }

        // EDIT
        private async Task Update(CreateOrEditMstEmployeeDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var mainObj = await _mstEmployeeAppService.GetAll()
                .FirstOrDefaultAsync(e => e.Id == input.Id);

                var mainObjToUpdate = ObjectMapper.Map(input, mainObj);
            }
        }

        public async Task Delete(EntityDto input)
        {
            var mainObj = await _mstEmployeeAppService.FirstOrDefaultAsync(input.Id);
            CurrentUnitOfWork.GetDbContext<tmssDbContext>().Remove(mainObj);
        }

        public async Task<PagedResultDto<MstEmployeeDto>> GetAll(GetMstEmployeeInput input)
        {
            var filtered = _mstEmployeeAppService.GetAll()
                .WhereIf(!string.IsNullOrWhiteSpace(input.EmployeeName), e => e.EmployeeName.Contains(input.EmployeeName))
                .WhereIf(!string.IsNullOrWhiteSpace(input.Position), e => e.Position.Contains(input.Position))
                .WhereIf(!string.IsNullOrWhiteSpace(input.PhoneNumber), e => e.PhoneNumber.Contains(input.PhoneNumber))
                .WhereIf(!string.IsNullOrWhiteSpace(input.AdrressEmployee), e => e.AdrressEmployee.Contains(input.AdrressEmployee))
                .WhereIf(!string.IsNullOrWhiteSpace(input.EmailEmployee), e => e.EmailEmployee.Contains(input.EmailEmployee));
            var pageAndFiltered = filtered.OrderBy(s => s.Id);


            var system = from o in filtered
                         select new MstEmployeeDto
                         {
                             Id = o.Id,
                             EmployeeName = o.EmployeeName,
                             Position = o.Position,
                             PhoneNumber = o.PhoneNumber,
                             AdrressEmployee = o.AdrressEmployee,
                             EmailEmployee = o.EmailEmployee
                         };

            var totalCount = await filtered.CountAsync();
            var paged = system.PageBy(input);

            return new PagedResultDto<MstEmployeeDto>(
                totalCount,
                 await paged.ToListAsync()
            );
        }

    }
}
