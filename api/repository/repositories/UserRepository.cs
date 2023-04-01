namespace Repository.Repositories;

public class UserRepository
{

    private readonly Context Context;

    protected UserRepository() { }

    public UserRepository(Context context)
    {
        Context = context;
    }

    public virtual User? Login(string? username, string? password)
        => Context.Users.SingleOrDefault(x => x.Username == username && x.Password == password);

    public virtual User? GetUser(Guid id)
        => Context.Users.SingleOrDefault(x => x.Id == id);

    public virtual IQueryable<User> List(int page, int size)
        => Context.Users.Take(size).Skip(page * size);

    public virtual Guid AddUser(User user)
    {
        var result = Context.Add(user);
        Context.SaveChanges();

        return result.Entity.Id;
    }

    public virtual void RemoveUser(Guid id)
    {
        User? user = Context.Users.SingleOrDefault(x => x.Id == id);

        if (user is not null)
        {
            Context.Users.Remove(user);
            Context.SaveChanges();
        }
    }

    public virtual void UpdateUser(Guid id, User user)
    {
        user.Id = id;
        Context.Users.Update(user);
        Context.SaveChanges();
    }
}
