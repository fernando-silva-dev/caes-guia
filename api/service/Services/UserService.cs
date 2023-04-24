using Domain.Interfazes.Repository;
using Service.Interfaces;

namespace Service.Services;

public class UserService : BaseService<User, UserInsertionModel, UserModel>, IUserService
{
    protected new IUserRepository Repository;
    public UserService(UserRepository repository, IMapper mapper) : base (repository, mapper)
    {
        Repository = repository;
    }

    public UserModel? Login(string? username, string? password)
        => Mapper.Map<UserModel>(Repository.Login(username, password));

    public void ResetPassword(Guid id, string oldPassword, string newPassord)
        => Repository.ResetPassword(id, oldPassword, newPassord);
}
