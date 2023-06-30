using Abp.Application.Services.Dto;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tmss.Sales.Invoice.Dto;
using tmss.Sales.Order.Dto;
using tmss.tmss.Master;
using tmss.tmss.Sales;

namespace tmss.Sales
{
    public class SalesOrderInvoiceAppService : tmssAppServiceBase
    {
        private readonly IDapperRepository<MstDishAppService, long> _mstDishAppService;
        private readonly IRepository<MstEmployeeAppService, long> _mstEmployeeAppServiceRepo;
        private readonly IRepository<MstTableAppService, long> _mstTableAppServiceRepo;
        private readonly IDapperRepository<SalesInvoiceDetailsAppService, long> _salesInvoiceDetailsRepo;
        public SalesOrderInvoiceAppService(
      
             IRepository<MstEmployeeAppService, long> mstEmployeeAppServiceRepo,
             IRepository<MstTableAppService, long> mstTableAppServiceRepo,
             IDapperRepository<MstDishAppService, long> mstDishAppService,
             IDapperRepository<SalesInvoiceDetailsAppService, long> salesInvoiceDetailsRepo

           )
        {
            _mstDishAppService = mstDishAppService;
            _mstEmployeeAppServiceRepo = mstEmployeeAppServiceRepo;
            _mstTableAppServiceRepo = mstTableAppServiceRepo;
            _salesInvoiceDetailsRepo = salesInvoiceDetailsRepo;


        }
    

        public async Task<List<MstDishListDto>> GetDistList(int TableId)
        {
            string _sqlSearch = "Exec [MST_DISH_LIST] @TableId";

            IEnumerable<MstDishListDto> _result = await _mstDishAppService.QueryAsync<MstDishListDto>(_sqlSearch,
                     new
                     {
                         TableId = TableId
                     });
            return _result.ToList();
        }


        public async Task<PagedResultDto<MstDishDetailDto>> GetAllDishDetail(MstDishDetailInnut input)
        {
            string _sqlSearch = "Exec MST_DISH_DETAIL @TableId";

            IEnumerable<MstDishDetailDto> result = await _salesInvoiceDetailsRepo.QueryAsync<MstDishDetailDto>(_sqlSearch,
                  new
                  {
                      TableId = input.TableId
                  });
            var listResult = result.ToList();

            var pagedAndFiltered = listResult.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();

            var totalCount = result.ToList().Count();

            return new PagedResultDto<MstDishDetailDto>(
                totalCount,
                pagedAndFiltered);
        }


        public async Task CreateOrEditDishTable(string ListDishId, int TableId)
        {
            string _sqlUpdateDes = "Exec [MST_ORDER_DISH_LIST] @ListDishId, @TableId";
            await _salesInvoiceDetailsRepo.ExecuteAsync(_sqlUpdateDes,
                   new
                   {
                       ListDishId = ListDishId,
                       TableId = TableId

                   });
        }
    


    }
}
