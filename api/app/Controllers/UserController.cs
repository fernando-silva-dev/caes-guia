using Microsoft.AspNetCore.Authorization;
using App.Models;
using Service.Models;
using Service.Interfaces;

namespace App.Controllers;

[Authorize(Roles = "Admin")]
public class UserController : BaseCrudController<UserInsertionModel, UserModel>
{
    protected readonly TokenGenerator TokenHandler;
    protected new readonly IUserService Service;
    
    public UserController(TokenGenerator tokenHandler, IUserService service) : base(service)
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
            return BadRequest(new { message = "Usuário ou senha inválidos" });

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
    [Route("self")]
    [Authorize]
    public ActionResult<UserModel> GetSelf()
        => Ok(Service.Get(new Guid(HttpContext.User.Claims.First(c => c.Type == "Id").Value)));

    [HttpPatch]
    [Route("{id}")]
    public ActionResult ResetPassword([FromRoute] Guid id, [FromBody] PasswordResetModel model)
    {
        var claimedId = HttpContext.User.Claims.First(c => c.Type == "Id").Value;

        if (id.ToString() != claimedId)
            throw new Exception("Você não tem permissão de alterar a senha desse usuário");

        Service.ResetPassword(id, model.OldPassword, model.NewPassword);
        return NoContent();
    }
}
