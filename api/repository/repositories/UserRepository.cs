namespace Repository.Repositories;

public class UserRepository
{

    private readonly Context Context;
    
    public UserRepository(Context context)
    {
        Context = context;
    }

    public User? GetUser(string? username, string? password)
    {
        return Context.Users.SingleOrDefault(x => x.Username == username && x.Password == password);
    }
}
