using Abp.Dependency;

namespace tmss.Storage
{
    public interface ITempFileCacheManager: ITransientDependency
    {
        void SetFile(string token, byte[] content);

        byte[] GetFile(string token);
    }
}
