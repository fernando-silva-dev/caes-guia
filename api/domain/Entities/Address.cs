namespace Domain.Entities;

public class Address
{
    public Address(string cep, string city, string street, string complement, string state, string district, string number)
    {
        Cep = cep;
        City = city;
        Street = street;
        Complement = complement;
        State = state;
        District = district;
        Number = number;
    }

    protected Address() { }

    public Guid UserId { get; protected set; }
    public string Cep { get; protected set; }
    public string City { get; protected set; }
    public string Street { get; protected set; }
    public string Complement { get; protected set; }
    public string State { get; protected set; }
    public string District { get; protected set; }
    public string Number { get; protected set; }
}
