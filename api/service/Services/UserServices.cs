namespace Service.Services;

public class UserService
{
    private readonly UserRepository Repository;
    private readonly IMapper Mapper;

    public UserService(UserRepository repository, IMapper mapper)
    {
        Repository = repository;
        Mapper = mapper;
    }

    public UserModel? GetUser(string? username, string? password)
        => Mapper.Map<UserModel>(Repository.GetUser(username, password));
}
