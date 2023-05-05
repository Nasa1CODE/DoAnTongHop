using System.Threading.Tasks;
using Abp.Dependency;

namespace tmss.MultiTenancy.Accounting
{
    public interface IInvoiceNumberGenerator : ITransientDependency
    {
        Task<string> GetNewInvoiceNumber();
    }
}