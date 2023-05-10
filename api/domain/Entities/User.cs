namespace Domain.Entities;

public class User : BaseEntity
{
    public User(string userName, string password, string role, string name, string cpf, string phone, Address address)
    {
        Id = Guid.NewGuid();
        Username = userName;
        Password = password;
        Role = role;
        Name = name;
        CPF = cpf;
        Phone = phone;
        Address = address;

        new UserValidator().ValidateAndThrow(this);
    }

    public User(Guid id)
    {
        Id = id;
    }

    protected User() { }

    public string Username { get; protected set; }
    public string Name { get; protected set; }
    public string Phone { get; protected set; }
    public string CPF { get; protected set; }
    public string Password { get; protected set; }
    public string Role { get; protected set; }
    public Address Address { get; protected set; }

    public void SetPassword(string password)
    {
        Password = password;
        new UserValidator().ValidateAndThrow(this);
    }
}
