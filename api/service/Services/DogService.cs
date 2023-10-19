using Common.Enum;
using Service.Models.Dog;

namespace Service.Services;

public sealed class DogService : BaseService<Dog, DogInsertionModel, DogViewModel>, IDogService
{
    public DogService(IDogRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }

    public IQueryable<DogViewModel> ListBySex(Sex sex)
    {
        return Mapper.ProjectTo<DogViewModel>(Repository.List().Where(x => x.Sex == sex));
    }
}
