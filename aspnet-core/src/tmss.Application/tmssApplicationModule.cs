using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using tmss.Authorization;

namespace tmss
{
    /// <summary>
    /// Application layer module of the application.
    /// </summary>
    [DependsOn(
        typeof(tmssApplicationSharedModule),
        typeof(tmssCoreModule)
        )]
    public class tmssApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Adding authorization providers
            Configuration.Authorization.Providers.Add<AppAuthorizationProvider>();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(tmssApplicationModule).GetAssembly());
        }
    }
}