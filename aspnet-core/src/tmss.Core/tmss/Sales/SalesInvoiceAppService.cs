using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace tmss.tmss.Sales
{
    [Table("AbpInvoice")]
    public class SalesInvoiceAppService : FullAuditedEntity<long>, IEntity<long>
    {
        public long? EmployeeId { get; set; }
        public long? TableId { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }
        public long? TotalAmount { get; set; }
        public string Status { get; set; }
    }
}
