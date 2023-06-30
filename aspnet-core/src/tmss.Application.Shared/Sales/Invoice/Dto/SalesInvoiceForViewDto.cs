using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.Sales.Invoice.Dto
{
    public class SalesInvoiceForViewDto : EntityDto<long?>
    {
        public string EmployeeName { get; set; }
        public string  TableName { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }
        public long? TotalAmount { get; set; }
        public string Status { get; set; }
    }

    public class GetSalesInvoiceInput : PagedAndSortedResultRequestDto
    {

        public long? EmployeeId { get; set; }
        public long? TableId { get; set; }
    }

    public class GetListTable
    {
        public long? Id { get; set; }
        public string TableName { get; set; }
        

    }

    public class GetListEmployee
    {
        public long? Id { get; set; }
        public string EmployeeName { get; set; }
    }



}
