using Service.Models.User;

namespace Service.Interfaces;

public interface IUserService : IBaseService<UserInsertionModel, UserViewModel>
{
    public UserViewModel? Login(string? username, string? password);
    public void ResetPassword(Guid id, string oldPassword, string newPassord);
}
