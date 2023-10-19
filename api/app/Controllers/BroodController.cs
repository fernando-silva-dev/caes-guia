using Service.Models.Brood;

namespace App.Controllers;

[Authorize(Roles = "Admin")]
public class BroodController : BaseCrudController<BroodInsertionModel, BroodViewModel>
{
    public BroodController(IBroodService service) : base(service)
    {
    }
}
