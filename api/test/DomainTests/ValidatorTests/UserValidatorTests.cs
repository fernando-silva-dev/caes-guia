using Common.Enum;

namespace Test.DomainTests.ValidatorTests;

public class UserValidatorTests
{
    #region Constants
    const string _20CharacterLongString = "Lorem ipsum dolor si";
    const string _21CharacterLongString = "Lorem ipsum dolor sit";
    const string _200CharacterLongString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies volutpat nisi eget ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin al";
    const string _201CharacterLongString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies volutpat nisi eget ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin ali";
    static Address validAddress = new Address("89110000", "Gaspar", "Adriano Kormann", "", "SC", "Bela Vista", "SN");
    #endregion

    [Theory]
    [InlineData("a", "password", Role.Operador, "Felipe", "99999999999", "4799999999", true)]
    [InlineData(_20CharacterLongString, _200CharacterLongString, Role.Operador, "Felipe", "99999999999", "4799999999", true)]
    [InlineData("", "password", Role.Operador, "Felipe", "99999999999", "4799999999", false)]
    [InlineData("admin", "", Role.Operador, "Felipe", "99999999999", "4799999999", false)]
    [InlineData(_21CharacterLongString, "password", Role.Operador, "Felipe", "99999999999", "4799999999", false)]
    [InlineData("admin", _201CharacterLongString, Role.Operador, "Felipe", "99999999999", "4799999999", false)]
    // TODO adicionar mais casos 
    public void Validation_Should_HaveExpectedResult(string username, string password, Role role, string name, string cpf, string phone, bool throwExpected)
    {
        User user = new User(username, password, role, name, cpf, phone, validAddress);
        UserValidator validator = new();

        var validation = () => validator.ValidateAndThrow(user);

        if (throwExpected)
            validation.Should().NotThrow();
        else
            validation.Should().Throw<ValidationException>();
    }
    // TODO fazer método que teste validação de endereço
}
