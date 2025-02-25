namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public required string UserName { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
    }
}
