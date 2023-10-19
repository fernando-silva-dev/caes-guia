using App.Models;
using Common.Enum;
using Service.Models.Dog;

namespace App.Controllers;

[Authorize(Roles = "Admin")]
public sealed class DogController : BaseCrudController<DogInsertionModel, DogViewModel>
{
    new readonly IDogService Service;
    public DogController(IDogService service) : base(service)
    {
        Service = service;
    }

    [HttpGet("males")]
    public ActionResult<PagedResult<DogViewModel>> Males([FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        return ListBySex(Sex.Male, page, size);
    }

    [HttpGet("females")]
    public ActionResult<PagedResult<DogViewModel>> Females([FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        return ListBySex(Sex.Female, page, size);
    }

    private ActionResult<PagedResult<DogViewModel>> ListBySex(Sex sex, int page, int size)
    {
        var query = Service.List().Where(x => x.Sex == sex);
        var data = query.Take(size).Skip(page * size);
        var totalRecords = query.Count();

        return Ok(new PagedResult<DogViewModel> { Data = data, TotalRecords = totalRecords });
    }
}
