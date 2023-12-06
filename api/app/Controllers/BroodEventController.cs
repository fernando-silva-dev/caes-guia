using Service.Models.BroodEvent;

namespace App.Controllers;

public class BroodEventController : BaseCrudController<BroodEventInsertionModel, BroodEventViewModel>
{
    public BroodEventController(IBroodEventService service) : base(service)
    {
    }
}
