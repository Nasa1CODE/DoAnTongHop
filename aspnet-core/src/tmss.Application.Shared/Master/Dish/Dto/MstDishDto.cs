using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.Master.Dish.Dto
{
    public  class MstDishDto : EntityDto<long?>
    {
        public string DishName { get; set; }
        public string UnitDish { get; set; }
        public string Price { get; set; }
        public string ImageDish { get; set; }
        public string DishType { get; set; }
        public string StatusDish { get; set; }
    }

    public class GetMstDishInput : PagedAndSortedResultRequestDto
    {
        public string DishName { get; set; }
        public string Price { get; set; }
    }

    public class CreateOrEditMstDishDto : EntityDto<long?>
    {
        public string DishName { get; set; }
        public string UnitDish { get; set; }
        public string Price { get; set; }
        public string ImageDish { get; set; }
        public string DishType { get; set; }
        public string StatusDish { get; set; }
    }



}
