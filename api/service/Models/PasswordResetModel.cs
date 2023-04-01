namespace Service.Models;

public class PasswordResetModel
{
    public Guid UserId { get; set; }
    public string NewPassword { get; set; }
    public string OldPassord { get; set; }
}
