using App.Models;
using Service.Models.Event;

namespace App.Controllers;

public class EventController : BaseCrudController<EventInsertModel, EventViewModel>
{
    public EventController(IEventService service) : base(service)
    {
    }

    [HttpGet("dog/{dogId}")]
    public ActionResult<PagedResult<EventViewModel>> List([FromRoute] Guid dogId, [FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        var query = Service.List().Where(x => x.DogId == dogId);
        var data = query.Take(size).Skip(page * size);
        var totalRecords = query.Count();

        return Ok(new PagedResult<EventViewModel> { Data = data, TotalRecords = totalRecords });
    }
}
