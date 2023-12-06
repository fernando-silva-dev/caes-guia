using Service.Models.BroodEventTemplate;

namespace App.Controllers;

public class BroodEventTemplateController : BaseCrudController<BroodEventTemplateInsertionModel, BroodEventTemplateViewModel>
{
    public BroodEventTemplateController(IBroodEventTemplateService service) : base(service)
    {
    }
}
