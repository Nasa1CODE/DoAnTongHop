using Abp.Dependency;
using GraphQL;
using GraphQL.Types;
using tmss.Queries.Container;

namespace tmss.Schemas
{
    public class MainSchema : Schema, ITransientDependency
    {
        public MainSchema(IDependencyResolver resolver) :
            base(resolver)
        {
            Query = resolver.Resolve<QueryContainer>();
        }
    }
}