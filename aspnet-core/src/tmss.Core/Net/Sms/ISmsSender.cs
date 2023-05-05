using System.Threading.Tasks;

namespace tmss.Net.Sms
{
    public interface ISmsSender
    {
        Task SendAsync(string number, string message);
    }
}