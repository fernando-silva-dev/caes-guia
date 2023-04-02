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
        => Context.Users.Include(x => x.Address).SingleOrDefault(x => x.Id == id);

    public virtual IQueryable<User> List()
        => Context.Users;

    public virtual User AddUser(User user)
    {
        var result = Context.Add(user);
        Context.SaveChanges();

        return result.Entity;
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
        user.SetId(id);
        Context.Users.Update(user);
        Context.SaveChanges();
    }

    public virtual void ResetPassword(Guid id, string oldPassword, string newPassord, string username)
    {
        var user = Context.Users.Single(x => x.Id == id);

        if (user.Username != username)
            throw new Exception("Você não tem permissão de alterar a senha desse usuário");

        if (user.Password != oldPassword)
            throw new Exception("Senha anterior não confere");

        user.SetPassword(newPassord);
        Context.Users.Update(user);
        Context.SaveChanges();
    }
}
