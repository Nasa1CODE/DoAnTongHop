using System.Collections.Generic;
using tmss.Authorization.Users.Importing.Dto;
using Abp.Dependency;

namespace tmss.Authorization.Users.Importing
{
    public interface IUserListExcelDataReader: ITransientDependency
    {
        List<ImportUserDto> GetUsersFromExcel(byte[] fileBytes);
    }
}
