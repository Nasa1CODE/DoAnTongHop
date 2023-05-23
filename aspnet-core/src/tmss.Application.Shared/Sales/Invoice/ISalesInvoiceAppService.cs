using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.Sales.Invoice.Dto;

namespace tmss.Sales.Invoice
{
    public interface ISalesInvoiceAppService : IApplicationService
    {
        Task<PagedResultDto<SalesInvoiceForViewDto>> GetAll(GetSalesInvoiceInput input);
        Task<List<GetListTable>> GetListTable();
        Task<List<GetListEmployee>> GetListEmployee();

    }
}
