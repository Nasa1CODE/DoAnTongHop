using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace tmss.tmss.Master
{
    [Table("AbpEmployee")]
    public class MstEmployeeAppService : FullAuditedEntity<long>, IEntity<long>
    {
        public string EmployeeName { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string AdrressEmployee { get; set; }
        public string EmailEmployee { get; set; }
    }
}
