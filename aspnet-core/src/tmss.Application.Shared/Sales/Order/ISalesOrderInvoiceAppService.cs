using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.Master.Dish.Dto;

namespace tmss.Sales.Order
{
   public  interface ISalesOrderInvoiceAppService : IApplicationService
    {
        Task<PagedResultDto<GetListTableID>> GetListTable(GetMstDishInput input)
    }
}
