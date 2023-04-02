namespace Service;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<User, UserModel>()
        .ForMember(x => x.Cep, y => y.MapFrom(x => x.Address.Cep))
        .ForMember(x => x.State, y => y.MapFrom(x => x.Address.State))
        .ForMember(x => x.Street, y => y.MapFrom(x => x.Address.Street))
        .ForMember(x => x.Number, y => y.MapFrom(x => x.Address.Number))
        .ForMember(x => x.City, y => y.MapFrom(x => x.Address.City))
        .ForMember(x => x.Complement, y => y.MapFrom(x => x.Address.Complement))
        .ForMember(x => x.District, y => y.MapFrom(x => x.Address.District));
        CreateMap<UserInsertionModel, User>()
        .ConstructUsing(x => new User(x.Username, x.Password, x.Role, x.Name, x.Cpf, x.Phone, new Address(x.Cep, x.City, x.Street, x.Complement, x.State, x.District, x.Number)));
    }
}
