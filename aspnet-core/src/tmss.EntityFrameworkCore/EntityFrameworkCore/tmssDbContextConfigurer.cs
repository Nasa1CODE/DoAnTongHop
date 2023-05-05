using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace tmss.EntityFrameworkCore
{
    public static class tmssDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<tmssDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<tmssDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}