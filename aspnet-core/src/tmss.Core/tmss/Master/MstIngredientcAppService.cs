using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace tmss.tmss.Master
{
    [Table("AbpIngredient")]
    public class MstIngredientcAppService : FullAuditedEntity<long>, IEntity<long>
    {
        public string IngredientName { get; set; }
        public string UnitIngredient { get; set; }
        public long? QuantityIngredient { get; set; }

    }
}
