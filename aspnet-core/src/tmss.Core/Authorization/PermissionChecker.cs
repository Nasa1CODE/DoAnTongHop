using Abp.Authorization;
using tmss.Authorization.Roles;
using tmss.Authorization.Users;

namespace tmss.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
