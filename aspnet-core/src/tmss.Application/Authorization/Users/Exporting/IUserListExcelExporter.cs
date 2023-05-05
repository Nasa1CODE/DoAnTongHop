using System.Collections.Generic;
using tmss.Authorization.Users.Dto;
using tmss.Dto;

namespace tmss.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}