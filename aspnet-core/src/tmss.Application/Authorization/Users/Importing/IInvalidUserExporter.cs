using System.Collections.Generic;
using tmss.Authorization.Users.Importing.Dto;
using tmss.Dto;

namespace tmss.Authorization.Users.Importing
{
    public interface IInvalidUserExporter
    {
        FileDto ExportToFile(List<ImportUserDto> userListDtos);
    }
}
