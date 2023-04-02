using Microsoft.AspNetCore.Authorization;
using App.Models;
using Service.Services;
using Service.Models;
using System.Security.Claims;

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
            User = new UserData
            {
                Name = user.Name,
                Username = user.Name,
                Role = user.Role
            },
            Token = token
        });
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize]
    public ActionResult<UserModel> GetUser(Guid id)
        => Ok(Service.GetUser(id));

    [HttpGet]
    public ActionResult<PagedResult<UserModel>> List([FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        var query = Service.List();
        var data = query.Take(size).Skip(page * size);
        var totalRecords = query.Count();

        return Ok(new PagedResult<UserModel> { Data = data, TotalRecords = totalRecords });
    }

    [HttpPost]
    public CreatedResult AddUser([FromBody] UserInsertionModel model)
    {
        var entity = Service.AddUser(model);
        string uri = $"user/{entity.Id}";

        return Created(uri, entity);
    }

    [HttpPut]
    [Route("{id}")]
    public ActionResult UpdateUser([FromRoute] Guid id, [FromBody] UserInsertionModel model)
    {
        Service.UpdateUser(id, model);
        return NoContent();
    }

    [HttpDelete]
    [Route("{id}")]
    public ActionResult RemoveUser([FromRoute] Guid id)
    {
        Service.RemoveUser(id);
        return NoContent();
    }

    [HttpPatch]
    [Route("{id}")]
    public ActionResult ResetPassword([FromRoute] Guid id, [FromBody] PasswordResetModel model)
    {
        var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Name).Value;

        Service.ResetPassword(id, model.OldPassord, model.NewPassword, username);
        return NoContent();
    }
}
