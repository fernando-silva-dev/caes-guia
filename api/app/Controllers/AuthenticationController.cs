using Microsoft.AspNetCore.Authorization;
using App.Models;
using Service.Services;
using Service.Models;

namespace App.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly TokenGenerator TokenHandler;
    private readonly UserService Service;
    public AuthenticationController(TokenGenerator tokenHandler, UserService service)
    {
        TokenHandler = tokenHandler;
        Service = service;
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public ActionResult<dynamic> Authenticate([FromBody] Credentials model)
    {
        UserModel? user = Service.GetUser(model.Username, model.Password);
        
        if (user is null)
            return NotFound(new { message = "Usuário ou senha inválidos" });

        var token = TokenHandler.GenerateToken(user);
        return new
        {
            user = user,
            token = token
        };
    }
}
