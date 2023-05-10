using Service.Models.User;

namespace Service.Services;

public class UserService : BaseService<User, UserInsertionModel, UserViewModel>, IUserService
{
    protected new IUserRepository Repository;
    public UserService(IUserRepository repository, IMapper mapper) : base(repository, mapper)
    {
        Repository = repository;
    }

    public UserViewModel Login(string username, string password)
        => Mapper.Map<UserViewModel>(Repository.Login(username, password));

    public void ResetPassword(Guid id, string oldPassword, string newPassord)
        => Repository.ResetPassword(id, oldPassword, newPassord);
}
