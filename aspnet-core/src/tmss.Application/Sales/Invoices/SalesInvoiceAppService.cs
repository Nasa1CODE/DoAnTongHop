
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using tmss.Sales.Invoice;
using tmss.Sales.Invoice.Dto;
using tmss.tmss.Master;
using tmss.tmss.Sales;

namespace tmss.Salse.Invoices
{
    public class SalesInvoiceAppService : tmssAppServiceBase, ISalesInvoiceAppService
    {
        private readonly IRepository<tmss.Sales.SalesInvoiceAppService, long> _salesInvoiceAppServiceRepo;
        private readonly IRepository<MstEmployeeAppService, long> _mstEmployeeAppServiceRepo;
        private readonly IRepository<MstTableAppService, long> _mstTableAppServiceRepo;
        public SalesInvoiceAppService(
           IRepository<tmss.Sales.SalesInvoiceAppService, long> salesInvoiceAppServiceRepo,
             IRepository<MstEmployeeAppService, long> mstEmployeeAppServiceRepo,
             IRepository<MstTableAppService, long> mstTableAppServiceRepo
           )
        {
            _salesInvoiceAppServiceRepo = salesInvoiceAppServiceRepo;
            _mstEmployeeAppServiceRepo = mstEmployeeAppServiceRepo;
            _mstTableAppServiceRepo = mstTableAppServiceRepo;
        }


        public async Task<PagedResultDto<SalesInvoiceForViewDto>> GetAll(GetSalesInvoiceInput input)
        {
            var query = from invoice in _salesInvoiceAppServiceRepo.GetAll()
                        .Where(e => input.EmployeeId == null || e.EmployeeId == input.EmployeeId)
                        .Where(e => input.TableId == null || e.TableId == input.TableId)
                        join o in _mstEmployeeAppServiceRepo.GetAll() on invoice.EmployeeId equals o.Id into invoices
                        from major in invoices.DefaultIfEmpty()
                        join o in _mstTableAppServiceRepo.GetAll() on invoice.TableId equals o.Id into tables
                        from tableRepo in tables.DefaultIfEmpty()
                        orderby invoice.CreationTime ascending
                        select new SalesInvoiceForViewDto
                        {
                            Id = invoice.Id,
                            EmployeeName = major.EmployeeName,
                            TableName = tableRepo.TableName,
                            TimeIn = invoice.TimeIn.Date,
                            TimeOut = invoice.TimeOut,
                            Status = invoice.Status
                        };
            var totalCount = await query.CountAsync();
            var pagedAndFilteredVehicleProductAppliedPosition = query.PageBy(input);

            return new PagedResultDto<SalesInvoiceForViewDto>(
                totalCount,
                await pagedAndFilteredVehicleProductAppliedPosition.ToListAsync());
        }



        public async Task<List<GetListTable>> GetListTable()
        {
            var major = from o in _mstTableAppServiceRepo.GetAll()
                        select new GetListTable
                        {
                            Id = o.Id,
                            TableName = o.TableName
                        };
            return await major.ToListAsync();
        }


        public async Task<List<GetListEmployee>> GetListEmployee()
        {
            var major = from o in _mstEmployeeAppServiceRepo.GetAll()
                        select new GetListEmployee
                        {
                            Id = o.Id,
                            EmployeeName = o.EmployeeName
                        };
            return await major.ToListAsync();
        }
    }
}
