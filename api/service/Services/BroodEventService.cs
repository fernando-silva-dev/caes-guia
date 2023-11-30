using Service.Models.BroodEvent;

namespace Service.Services;

public class BroodEventService : BaseService<BroodEvent, BroodEventInsertionModel, BroodEventViewModel>, IBroodEventService
{
    public BroodEventService(IBroodEventRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}
