namespace Domain.Interfazes.Repository;

public interface IUserRepository : IBaseRepository<User>
{
    public User? Login(string? username, string? password);
    public void ResetPassword(Guid id, string oldPassword, string newPassord);
}
