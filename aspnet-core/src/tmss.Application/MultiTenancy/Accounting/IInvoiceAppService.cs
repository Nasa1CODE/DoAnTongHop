using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using tmss.MultiTenancy.Accounting.Dto;

namespace tmss.MultiTenancy.Accounting
{
    public interface IInvoiceAppService
    {
        Task<InvoiceDto> GetInvoiceInfo(EntityDto<long> input);

        Task CreateInvoice(CreateInvoiceDto input);
    }
}
