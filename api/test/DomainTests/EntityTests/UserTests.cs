using Common.Enum;

namespace Test.DomainTests.EntityTests;

public class UserTests
{
    #region Constants
    const string _20CharacterLongString = "Lorem ipsum dolor si";
    const string _21CharacterLongString = "Lorem ipsum dolor sit";
    const string _200CharacterLongString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies volutpat nisi eget ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin al";
    const string _201CharacterLongString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies volutpat nisi eget ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin ali";
    static Address validAddress = new Address("89110000", "Gaspar", "Adriano Kormann", "", "SC", "Bela Vista", "SN");
    #endregion

    [Fact]
    // [InlineData("a", "password", Role.Operador, "Felipe", "99999999999", "4799999999")]
    // [InlineData(_20CharacterLongString, _200CharacterLongString, Role.Operador, "Felipe", "99999999999", "4799999999")]
    public void Constructor_Should_Construct()
    {
        var address = new Address("89110000", "Gaspar", "Adriano Kormann", "", "SC", "Bela Vista", "SN");
        var validConstruction = () => new User("admin", "password", Role.Admin, "name", "12345678901", "1234567890", address);

        validConstruction.Should().NotThrow();
        validConstruction().Should().BeOfType<User>();
    }

    [Theory]
    [InlineData("", "password", Role.Operador, "Felipe", "99999999999", "4799999999")]
    [InlineData("admin", "", Role.Operador, "Felipe", "99999999999", "4799999999")]
    [InlineData(_21CharacterLongString, "password", Role.Operador, "Felipe", "99999999999", "4799999999")]
    [InlineData("admin", _201CharacterLongString, Role.Operador, "Felipe", "99999999999", "4799999999")]
    // TODO adicionar mais casos 
    public void Validation_Should_ThrowValidationException(string username, string password, Role role, string name, string cpf, string phone)
    {
        var construction = () => new User(username, password, role, name, cpf, phone, validAddress);

        construction.Should().Throw<FluentValidation.ValidationException>();
    }
    // TODO fazer método que teste validação de endereço
}
