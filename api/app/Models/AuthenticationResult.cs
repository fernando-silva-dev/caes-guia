using Service.Models;

namespace App.Models;

public class AuthenticationResult {
    public UserModel User { get; set; }
    public string Token { get; set; }
}