using System.Threading.Tasks;
using Abp.Webhooks;

namespace tmss.WebHooks
{
    public interface IWebhookEventAppService
    {
        Task<WebhookEvent> Get(string id);
    }
}
