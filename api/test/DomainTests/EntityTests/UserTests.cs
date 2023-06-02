using Common.Enum;

namespace Test.DomainTests.EntityTests;

public class UserTests
{
    [Fact]
    public void Constructor_Should_Construct()
    {
        var validConstruction = () => new User("admin", "password", Role.Admin, "name", "12345678901", "1234567890", new Address());

        validConstruction.Should().NotThrow();
        validConstruction().Should().BeOfType<User>();
    }

    [Fact]
    public void Constructor_Should_ThrowValidationException()
    {
        var invalidConstruction = () => new User("", "", (Role)0, "", "", "", null);

        invalidConstruction.Should().Throw<FluentValidation.ValidationException>();
    }
}
