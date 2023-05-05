using System.Collections.Generic;
using System.Threading.Tasks;
using Abp;
using tmss.Dto;

namespace tmss.Gdpr
{
    public interface IUserCollectedDataProvider
    {
        Task<List<FileDto>> GetFiles(UserIdentifier user);
    }
}
