using Common.Enum;

namespace Test.DomainTests.ValidatorTests;

public class UserValidatorTests
{
    #region Constants
    const string _20CharacterLongString = "Lorem ipsum dolor si";
    const string _21CharacterLongString = "Lorem ipsum dolor sit";
    const string _200CharacterLongString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies volutpat nisi eget ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin al";
    const string _201CharacterLongString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies volutpat nisi eget ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin ali";
    #endregion

    // [Theory]
    // [InlineData("a", "password", true)]
    // [InlineData(_20CharacterLongString, _200CharacterLongString, true)]
    // [InlineData("", "password", false)]
    // [InlineData("admin", "", false)]
    // [InlineData(_21CharacterLongString, "password", false)]
    // [InlineData("admin", _201CharacterLongString, false)]
    // public void Validation_Should_HaveExpectedResult(string username, string password, Role role, string name, string cpf, string phone, bool throwExpected)
    // {
    //     User user = new User(username, password, role, name, cpf, phone, null);
    //     UserValidator validator = new();

    //     var validation = () => validator.ValidateAndThrow(user);

    //     if (throwExpected)
    //         validation.Should().NotThrow();
    //     else
    //         validation.Should().Throw<ValidationException>();
    // }
}
