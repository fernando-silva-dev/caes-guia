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

    public virtual UserModel? GetUser(string? username, string? password)
        => Mapper.Map<UserModel>(Repository.GetUser(username, password));
}
