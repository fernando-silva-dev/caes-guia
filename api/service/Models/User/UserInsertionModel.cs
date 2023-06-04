using Common.Enum;

namespace Service.Models.User;

public class UserInsertionModel
{
    public string Password { get; set; }
    public string Username { get; set; }
    public Role Role { get; set; }
    public string Name { get; set; }
    public string Cpf { get; set; }
    public string Phone { get; set; }
    public string Cep { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string Complement { get; set; }
    public string State { get; set; }
    public string District { get; set; }
    public string Number { get; set; }
}