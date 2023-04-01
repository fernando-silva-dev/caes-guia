using Microsoft.AspNetCore.Authorization;
using App.Models;
using Service.Services;
using Service.Models;

namespace App.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly TokenGenerator TokenHandler;
    private readonly UserService Service;
    public UserController(TokenGenerator tokenHandler, UserService service)
    {
        TokenHandler = tokenHandler;
        Service = service;
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public ActionResult<AuthenticationResult> Authenticate([FromBody] Credentials model)
    {
        UserModel? user = Service.Login(model.Username, model.Password);

        if (user is null)
            return NotFound(new { message = "Usuário ou senha inválidos" });

        var token = TokenHandler.GenerateToken(user);
        return Ok(new AuthenticationResult
        {
            User = user,
            Token = token
        });
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize]
    public ActionResult<UserModel> GetUser(Guid id)
        => Ok(Service.GetUser(id));

    [HttpGet]
    public ActionResult<IEnumerable<UserModel>> List([FromQuery] int page = 0, [FromQuery] int size = 10)
        => Ok(Service.List(page, size));

    [HttpPost]
    public ActionResult<Guid> AddUser([FromBody] UserInsertionModel model)
        => Ok(Service.AddUser(model));

    [HttpPut]
    [Route("{id}")]
    public void UpdateUser([FromRoute] Guid id, [FromBody] UserInsertionModel model)
        => Service.UpdateUser(id, model);

    [HttpDelete]
    [Route("{id}")]
    public void RemoveUser([FromRoute] Guid id)
        => Service.RemoveUser(id);
}
