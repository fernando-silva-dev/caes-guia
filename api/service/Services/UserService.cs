namespace Service.Services;

public class UserService
{
    private readonly UserRepository Repository;
    private readonly IMapper Mapper;

    protected UserService() { }

    public UserService(UserRepository repository, IMapper mapper)
    {
        Repository = repository;
        Mapper = mapper;
    }

    public virtual UserModel? Login(string? username, string? password)
        => Mapper.Map<UserModel>(Repository.Login(username, password));

    public virtual UserModel GetUser(Guid id)
        => Mapper.Map<UserModel>(Repository.GetUser(id));

    public virtual IQueryable<UserModel> List()
        => Mapper.ProjectTo<UserModel>(Repository.List());

    public virtual UserModel AddUser(UserInsertionModel model)
        => Mapper.Map<UserModel>(Repository.AddUser(Mapper.Map<User>(model)));

    public virtual void UpdateUser(Guid id, UserInsertionModel model)
        => Repository.UpdateUser(id, Mapper.Map<User>(model));

    public virtual void RemoveUser(Guid id)
        => Repository.RemoveUser(id);

    public virtual void ResetPassword(Guid id, string oldPassword, string newPassord, string username)
        => Repository.ResetPassword(id, oldPassword, newPassord, username);
}
