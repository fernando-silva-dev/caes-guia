using Service.Models.Event;

namespace Service.Services;

public class EventService : BaseService<Event, EventInsertModel, EventViewModel>, IEventService
{
    public EventService(IEventRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}
