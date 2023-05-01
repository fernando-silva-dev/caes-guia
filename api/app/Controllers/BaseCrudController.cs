using App.Models;
using Microsoft.AspNetCore.Authorization;
using Service.Interfaces;
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
    public ActionResult<TViewModel> Get(Guid id)
        => Ok(Service.Get(id));

    [HttpGet]
    public ActionResult<PagedResult<TViewModel>> List([FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        var query = Service.List();
        var data = query.Take(size).Skip(page * size);
        var totalRecords = query.Count();

        return Ok(new PagedResult<TViewModel> { Data = data, TotalRecords = totalRecords });
    }

    [HttpPost]
    public CreatedResult Add([FromBody] TInsertModel model)
    {
        var entity = Service.Add(model);
        string uri = $"user/{entity.Id}";

        return Created(uri, entity);
    }

    [HttpPut]
    [Route("{id}")]
    public ActionResult Update([FromRoute] Guid id, [FromBody] TInsertModel model)
    {
        Service.Update(id, model);
        return NoContent();
    }

    [HttpDelete]
    [Route("{id}")]
    public ActionResult Remove([FromRoute] Guid id)
    {
        Service.Remove(id);
        return NoContent();
    }
}