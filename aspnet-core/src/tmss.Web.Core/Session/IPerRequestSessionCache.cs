using System.Threading.Tasks;
using tmss.Sessions.Dto;

namespace tmss.Web.Session
{
    public interface IPerRequestSessionCache
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformationsAsync();
    }
}
