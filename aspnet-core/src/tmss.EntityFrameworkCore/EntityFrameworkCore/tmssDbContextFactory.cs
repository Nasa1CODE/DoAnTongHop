using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using tmss.Configuration;
using tmss.Web;

namespace tmss.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class tmssDbContextFactory : IDesignTimeDbContextFactory<tmssDbContext>
    {
        public tmssDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<tmssDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder(), addUserSecrets: true);

            tmssDbContextConfigurer.Configure(builder, configuration.GetConnectionString(tmssConsts.ConnectionStringName));

            return new tmssDbContext(builder.Options);
        }
    }
}