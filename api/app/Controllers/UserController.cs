using Microsoft.AspNetCore.Authorization;
using App.Models;
using Service.Services;
using Service.Models;

namespace App.Controllers;

[ApiController]
[Authorize]
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
        UserModel? user = Service.GetUser(model.Username, model.Password);
        
        if (user is null)
            return NotFound(new { message = "Usuário ou senha inválidos" });

        var token = TokenHandler.GenerateToken(user);
        return new AuthenticationResult
        {
            User = user,
            Token = token
        };
    }

    [HttpGet]
    [Route("teste")]
    public ActionResult<string> Teste(){
        return "teste";
    }

    // Recuperação de senha
    // Get User
    // Get users paginado
    // Create User
    // Update user
    // Delete user
}
