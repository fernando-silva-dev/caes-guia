using Service.Models;

namespace App.Models;

public class AuthenticationResult {
    public UserData User { get; set; }
    public string Token { get; set; }
}

public class UserData {
    public string Username { get; set; }
    public string Role { get; set; }
    public string Name { get; set; }
}