using Domain.Interfaces.Repository;

namespace Repository.Repositories;

public class EventRepository : BaseRepository<Event>, IEventRepository
{
    public EventRepository(Context context) : base(context)
    {
    }

    public override IQueryable<Event> List()
    {
        return Context.Events.Include(x => x.Attachments);
    }
}
