using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public required string Username { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
