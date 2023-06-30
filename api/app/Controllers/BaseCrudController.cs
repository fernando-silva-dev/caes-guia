using App.Models;
using Service.Models;

namespace App.Controllers;

[ApiController]
[Route("[controller]")]
public abstract class BaseCrudController<TInsertModel, TViewModel> : ControllerBase where TInsertModel : class where TViewModel : BaseViewModel
{
    protected readonly IBaseService<TInsertModel, TViewModel> Service;
    public BaseCrudController(IBaseService<TInsertModel, TViewModel> service)
    {
        Service = service;
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize]
    public virtual ActionResult<TViewModel> Get(Guid id)
        => Ok(Service.Get(id));

    [HttpGet]
    public virtual ActionResult<PagedResult<TViewModel>> List([FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        var query = Service.List();
        var data = query.Take(size).Skip(page * size);
        var totalRecords = query.Count();

        return Ok(new PagedResult<TViewModel> { Data = data, TotalRecords = totalRecords });
    }

    [HttpPost]
    public virtual CreatedResult Add([FromBody] TInsertModel model)
    {
        var entity = Service.Add(model);
        // TODO find a way to mock request.path.value
        return Created($"{Request?.Path.Value}/{entity.Id}", entity);
    }

    [HttpPut]
    [Route("{id}")]
    public virtual ActionResult Update([FromRoute] Guid id, [FromBody] TInsertModel model)
    {
        Service.Update(id, model);
        return NoContent();
    }

    [HttpDelete]
    [Route("{id}")]
    public virtual ActionResult Remove([FromRoute] Guid id)
    {
        Service.Remove(id);
        return NoContent();
    }
}
