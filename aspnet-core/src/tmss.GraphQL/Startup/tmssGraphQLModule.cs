using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace tmss.Startup
{
    [DependsOn(typeof(tmssCoreModule))]
    public class tmssGraphQLModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(tmssGraphQLModule).GetAssembly());
        }

        public override void PreInitialize()
        {
            base.PreInitialize();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }
    }
}