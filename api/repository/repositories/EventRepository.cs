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

    public override void Update(Guid id, Event @event)
    {
        var attachments = Context.Attachments.Where(x => @event.AttachmentIds.Contains(x.Id));
        @event.Attachments = attachments.ToList();

        base.Update(id, @event);
    }
}
