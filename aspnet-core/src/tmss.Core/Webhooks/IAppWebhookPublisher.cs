using System.Threading.Tasks;
using tmss.Authorization.Users;

namespace tmss.WebHooks
{
    public interface IAppWebhookPublisher
    {
        Task PublishTestWebhook();
    }
}
