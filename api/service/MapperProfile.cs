namespace Service;

public class MapperProfile : Profile {
    public MapperProfile()
    {
        CreateMap<User, UserModel>();
    }
}
