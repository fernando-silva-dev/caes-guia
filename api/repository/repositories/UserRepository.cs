using Domain.Interfaces.Repository;

namespace Repository.Repositories;

public sealed class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(Context context) : base(context) { }

    public User Login(string username, string password)
        => Context.Users.SingleOrDefault(x => x.Username == username && x.Password == password);

    public void ResetPassword(Guid id, string oldPassword, string newPassord)
    {
        var user = Context.Users.Single(x => x.Id == id);

        if (user.Password != oldPassword)
            throw new Exception("Senha anterior não confere");

        user.SetPassword(newPassord);
        Context.Users.Update(user);
        Context.SaveChanges();
    }
}
