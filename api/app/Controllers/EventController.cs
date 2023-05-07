using Service.Models.Event;

namespace App.Controllers;

public class EventController : BaseCrudController<EventInsertModel, EventViewModel>
{
    public EventController(IEventService service) : base(service)
    {
    }
}
