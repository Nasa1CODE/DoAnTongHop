using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.Master.Employee.Dto
{
    public class MstEmployeeDto : EntityDto<long?>
    {
        public string EmployeeName { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string AdrressEmployee { get; set; }
        public string EmailEmployee { get; set; }
    }

    public class GetMstEmployeeInput : PagedAndSortedResultRequestDto
    {
        public string EmployeeName { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string AdrressEmployee { get; set; }
        public string EmailEmployee { get; set; }
    }

    public class CreateOrEditMstEmployeeDto : EntityDto<long?>
    {
        public string EmployeeName { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string AdrressEmployee { get; set; }
        public string EmailEmployee { get; set; }
    }
}

