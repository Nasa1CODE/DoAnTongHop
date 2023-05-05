using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.Master.Table.Dto
{
    public class MstTableDto : EntityDto<long?>
    {
        public string TableName { get; set; }
        public string TableType { get; set; }
        public long? AmountPeople { get; set; }
        public string StatusTable { get; set; }
    }

    public class GetMstTableInput : PagedAndSortedResultRequestDto
    {

        public string TableName { get; set; }
        public string TableType { get; set; }
    }

    public class CreateOrEditMstTableDto : EntityDto<long?>
    {
        public string TableName { get; set; }
        public string TableType { get; set; }
        public long? AmountPeople { get; set; }
        public string StatusTable { get; set; }
    }

}
