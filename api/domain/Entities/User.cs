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

    public Guid Id { get; protected set; }
    public string Username { get; protected set; }
    public string Password { get; protected set; }
    public string Role { get; protected set; }

    public void SetId(Guid id)
    {
        Id = id;

        new UserValidator().ValidateAndThrow(this);
    }

    public void SetPassword(string password)
    {
        Password = password;
        
        new UserValidator().ValidateAndThrow(this);
    }
}
