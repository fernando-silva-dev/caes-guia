namespace domain;
public class User
{
    public User(string userName, string password)
    {
        UserName = userName;
        Password = password;
    }

    public string UserName { get; protected set; }
    public string Password { get; protected set; }
}
