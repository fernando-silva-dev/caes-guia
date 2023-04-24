namespace Service.Interfaces;

public interface IUserService : IBaseService<UserInsertionModel, UserModel>
{
    public UserModel? Login(string? username, string? password);

    public void ResetPassword(Guid id, string oldPassword, string newPassord);
}
