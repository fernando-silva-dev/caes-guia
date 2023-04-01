namespace Service;

public class MapperProfile : Profile {
    public MapperProfile()
    {
        CreateMap<User, UserModel>();
        CreateMap<UserInsertionModel, User>().ConstructUsing(x => new User(x.Username, x.Password, x.Role));
    }
}
