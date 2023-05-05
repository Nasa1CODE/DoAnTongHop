using System.Collections.Generic;
using Abp;
using tmss.Chat.Dto;
using tmss.Dto;

namespace tmss.Chat.Exporting
{
    public interface IChatMessageListExcelExporter
    {
        FileDto ExportToFile(UserIdentifier user, List<ChatMessageExportDto> messages);
    }
}
