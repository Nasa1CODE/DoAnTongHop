using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace tmss.tmss.Master
{
    [Table("AbpTable")]
    public  class MstTableAppService : FullAuditedEntity<long>, IEntity<long>
    {
        public string TableName { get; set; }
        public string TableType { get; set; }
        public long? AmountPeople { get; set; }
        public string StatusTable { get; set; }
    }
}
