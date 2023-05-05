using System.Threading.Tasks;
using Abp.Application.Services;
using tmss.MultiTenancy.Payments.PayPal.Dto;

namespace tmss.MultiTenancy.Payments.PayPal
{
    public interface IPayPalPaymentAppService : IApplicationService
    {
        Task ConfirmPayment(long paymentId, string paypalOrderId);

        PayPalConfigurationDto GetConfiguration();
    }
}
