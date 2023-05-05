using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using tmss.Authorization.Users;
using tmss.MultiTenancy;

namespace tmss.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}