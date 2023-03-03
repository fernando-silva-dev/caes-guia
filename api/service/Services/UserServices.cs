namespace Service.Services;

public class UserService
{
    private readonly UserRepository Repository;

    public UserService(UserRepository repository)
    {
        Repository = repository;
    }

    public UserModel? GetUser(string? username, string? password)
    {
        User? user = Repository.GetUser(username, password);
        if (user is null)
            return null;

        return new() { Username = user.Username, Role = user.Role };
    }
}
