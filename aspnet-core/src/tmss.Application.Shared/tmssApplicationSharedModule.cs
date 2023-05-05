using Abp.Modules;
using Abp.Reflection.Extensions;

namespace tmss
{
    [DependsOn(typeof(tmssCoreSharedModule))]
    public class tmssApplicationSharedModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(tmssApplicationSharedModule).GetAssembly());
        }
    }
}