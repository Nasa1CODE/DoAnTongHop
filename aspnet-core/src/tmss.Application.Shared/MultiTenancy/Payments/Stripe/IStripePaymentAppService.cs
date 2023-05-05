using System.Threading.Tasks;
using Abp.Application.Services;
using tmss.MultiTenancy.Payments.Dto;
using tmss.MultiTenancy.Payments.Stripe.Dto;

namespace tmss.MultiTenancy.Payments.Stripe
{
    public interface IStripePaymentAppService : IApplicationService
    {
        Task ConfirmPayment(StripeConfirmPaymentInput input);

        StripeConfigurationDto GetConfiguration();

        Task<SubscriptionPaymentDto> GetPaymentAsync(StripeGetPaymentInput input);

        Task<string> CreatePaymentSession(StripeCreatePaymentSessionInput input);
    }
}