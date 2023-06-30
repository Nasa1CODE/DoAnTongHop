using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.Sales.Order.Dto
{
    public class GetListTableID : EntityDto<long?>
    {
        public long? Id { get; set; }
        public string TableName { get; set; }
        public string TableType { get; set; }
        public long? AmountPeople { get; set; }
        public string StatusTable { get; set; }
    }

    public class GetListTableIDInput : PagedResultRequestDto
    {
      
    }

    public class MstDishListDto
    {
        public int? Id { get; set; }
        public int? TableId { get; set; }
        public  string DishName { get; set; }
        public string TableName { get; set; }
        public bool Checks { get; set; }

    }

    public class MstDishDetailDto : EntityDto<long?>
    {
        public string DishName { get; set; }
        public string DishType { get; set; }
        public string UnitDish { get; set; }
        public string StatusDish { get; set; }
        public string Price { get; set; }
    }
    public class MstDishDetailInnut : PagedAndSortedResultRequestDto
    {
        public int? TableId { get; set; }
    }
}
