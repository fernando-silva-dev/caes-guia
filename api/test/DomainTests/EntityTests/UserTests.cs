namespace Test.DomainTests.EntityTests;

public class UserTests
{
    [Fact]
    public void Constructor_Should_Construct()
    {
        var validConstruction = () => new User("admin", "password", "admin", "name", "12345678901", "1234567890", null);

        validConstruction.Should().NotThrow();
        validConstruction().Should().BeOfType<User>();
    }

    [Fact]
    public void Constructor_Should_ThrowValidationException()
    {
        var invalidConstruction = () => new User("", "", "", "", "", "", null);

        invalidConstruction.Should().Throw<FluentValidation.ValidationException>();
    }
}
