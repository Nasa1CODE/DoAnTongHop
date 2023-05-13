using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.Master.Ingredient.Dto
{
   public  class MstIngredientDto : EntityDto<long?>
    {
        public string IngredientName { get; set; }
        public string UnitIngredient { get; set; }
        public long? QuantityIngredient { get; set; }
    }


    public class GetMstIngredientInput : PagedAndSortedResultRequestDto
    {
        public string IngredientName { get; set; }
        public string UnitIngredient { get; set; }
    }

    public class CreateOrEditMstIngredientDto : EntityDto<long?>
    {
        public string IngredientName { get; set; }
        public string UnitIngredient { get; set; }
        public long? QuantityIngredient { get; set; }
    }
}
