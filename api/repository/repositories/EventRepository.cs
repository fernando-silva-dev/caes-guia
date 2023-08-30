using Domain.Interfaces.Repository;

namespace Repository.Repositories;

public class EventRepository : BaseRepository<Event>, IEventRepository
{
    public EventRepository(Context context) : base(context)
    {
    }
}
