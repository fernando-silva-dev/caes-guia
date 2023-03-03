namespace Repository.Repositories;

public class UserRepository
{

    private readonly Context Context;
    private List<User> mockDbSet = new List<User>() { new("admin", "admin", "admin") };

    public UserRepository(Context context)
    {
        Context = context;
    }

    public User? GetUser(string? username, string? password)
    {
        return mockDbSet.SingleOrDefault(x => x.Username == username && x.Password == password);
    }
}
