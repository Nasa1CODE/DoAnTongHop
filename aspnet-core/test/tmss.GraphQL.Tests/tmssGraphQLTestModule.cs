using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.Windsor.MsDependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using tmss.Configure;
using tmss.Startup;
using tmss.Test.Base;

namespace tmss.GraphQL.Tests
{
    [DependsOn(
        typeof(tmssGraphQLModule),
        typeof(tmssTestBaseModule))]
    public class tmssGraphQLTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            IServiceCollection services = new ServiceCollection();
            
            services.AddAndConfigureGraphQL();

            WindsorRegistrationHelper.CreateServiceProvider(IocManager.IocContainer, services);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(tmssGraphQLTestModule).GetAssembly());
        }
    }
}