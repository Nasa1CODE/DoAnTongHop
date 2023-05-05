using System.ComponentModel.DataAnnotations;

namespace tmss.Authorization.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
