using Service.Models.Dog;

namespace Service.Services;

public sealed class DogService : BaseService<Dog, DogInsertionModel, DogViewModel>, IDogService
{
    public DogService(BaseRepository<Dog> repository, IMapper mapper) : base(repository, mapper)
    {
    }
}
