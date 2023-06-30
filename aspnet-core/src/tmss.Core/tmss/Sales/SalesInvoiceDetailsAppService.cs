using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace tmss.tmss.Sales
{
    [Table("AbpInvoiceDetails")]
    public class SalesInvoiceDetailsAppService : FullAuditedEntity<long>, IEntity<long>
    {
         public long? DishId { get; set; }
         public long? TableId { get; set; }
    }
}
