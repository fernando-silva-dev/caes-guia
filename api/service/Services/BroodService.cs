using Service.Models.Brood;

namespace Service.Services;

public class BroodService : BaseService<Brood, BroodInsertionModel, BroodViewModel>, IBroodService
{
    public BroodService(IBroodRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}