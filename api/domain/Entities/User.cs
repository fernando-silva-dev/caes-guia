namespace Domain.Entities;

public class User
{
    public User(string userName, string password, string role)
    {
        Id = Guid.NewGuid();
        Username = userName;
        Password = password;
        Role = role;

        new UserValidator().ValidateAndThrow(this);
    }

    protected User() { }

    public Guid Id { get; set; }
    public string Username { get; protected set; }
    public string Password { get; protected set; }
    public string Role { get; protected set; }
}
