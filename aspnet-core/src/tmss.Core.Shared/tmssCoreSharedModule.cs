using Abp.Modules;
using Abp.Reflection.Extensions;

namespace tmss
{
    public class tmssCoreSharedModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(tmssCoreSharedModule).GetAssembly());
        }
    }
}