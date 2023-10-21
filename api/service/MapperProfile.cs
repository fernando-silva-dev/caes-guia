using Service.Models.Attachment;
using Service.Models.Brood;
using Service.Models.Dog;
using Service.Models.Event;
using Service.Models.User;

namespace Service;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<User, UserViewModel>()
            .ForMember(x => x.Cep, y => y.MapFrom(x => x.Address.Cep))
            .ForMember(x => x.State, y => y.MapFrom(x => x.Address.State))
            .ForMember(x => x.Street, y => y.MapFrom(x => x.Address.Street))
            .ForMember(x => x.Number, y => y.MapFrom(x => x.Address.Number))
            .ForMember(x => x.City, y => y.MapFrom(x => x.Address.City))
            .ForMember(x => x.Complement, y => y.MapFrom(x => x.Address.Complement))
            .ForMember(x => x.District, y => y.MapFrom(x => x.Address.District));
        CreateMap<UserInsertionModel, User>()
            .ConstructUsing(x => new User(x.Username, x.Password, x.Role, x.Name, x.Cpf, x.Phone, new Address(x.Cep, x.City, x.Street, x.Complement, x.State, x.District, x.Number)));

        CreateMap<Dog, DogViewModel>();
        CreateMap<DogInsertionModel, Dog>()
            .ConstructUsing(x => new Dog(x.Name, x.BirthDate, x.Coat, x.Status, x.Sex, null));

        CreateMap<Event, EventViewModel>();
        CreateMap<EventInsertModel, Event>()
            .ConstructUsing(x => new Event(x.Description, x.Date, x.DogId));

        CreateMap<Attachment, AttachmentViewModel>();
        CreateMap<AttachmentInsertionModel, Attachment>()
            .ConstructUsing(x => new Attachment(x.Name, x.Content, x.ContentType));

        CreateMap<Attachment, AttachmentModel>();

        CreateMap<Brood, BroodViewModel>();
        CreateMap<BroodInsertionModel, Brood>()
            .ConstructUsing(m => new Brood(m.Description, m.MotherId, m.FatherId));
    }
}
