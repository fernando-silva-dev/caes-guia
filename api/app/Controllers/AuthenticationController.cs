namespace app.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    [HttpGet(Name = "Teste")]
    public string Get(){
        return "hello world!";
    }
}
