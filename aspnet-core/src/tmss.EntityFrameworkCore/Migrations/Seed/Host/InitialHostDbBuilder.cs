using tmss.EntityFrameworkCore;

namespace tmss.Migrations.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly tmssDbContext _context;

        public InitialHostDbBuilder(tmssDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}
