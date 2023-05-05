using Microsoft.Extensions.Configuration;

namespace tmss.Configuration
{
    public interface IAppConfigurationAccessor
    {
        IConfigurationRoot Configuration { get; }
    }
}
