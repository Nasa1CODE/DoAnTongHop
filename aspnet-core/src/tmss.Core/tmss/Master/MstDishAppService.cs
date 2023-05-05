using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace tmss.tmss.Master
{
    [Table("AbpDish")]
    public class MstDishAppService : FullAuditedEntity<long>, IEntity<long>
    {
        public string DishName { get; set; }
        public string UnitDish { get; set; }
        public string Price { get; set; }
        public string ImageDish { get; set; }
        public string  DishType {get; set;}
        public string StatusDish { get; set; }
    }
}
