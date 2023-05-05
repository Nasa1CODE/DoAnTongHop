using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using tmss.EntityFrameworkCore;

namespace tmss.HealthChecks
{
    public class tmssDbContextHealthCheck : IHealthCheck
    {
        private readonly DatabaseCheckHelper _checkHelper;

        public tmssDbContextHealthCheck(DatabaseCheckHelper checkHelper)
        {
            _checkHelper = checkHelper;
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
        {
            if (_checkHelper.Exist("db"))
            {
                return Task.FromResult(HealthCheckResult.Healthy("tmssDbContext connected to database."));
            }

            return Task.FromResult(HealthCheckResult.Unhealthy("tmssDbContext could not connect to database"));
        }
    }
}
