using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Service.Models.User;

namespace App;

public class TokenGenerator
{
    private readonly string _key;

    public TokenGenerator(IConfiguration config)
    {
        _key = config.GetValue<string>("TOKEN_KEY") ?? throw new ArgumentNullException("TOKEN_KEY");
    }

    public string GenerateToken(UserViewModel user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var keyBytes = Encoding.ASCII.GetBytes(_key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim("Id", user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
