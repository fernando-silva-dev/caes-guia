namespace Test.DomainTests.EntityTests;

public class UserTests
{
    [Fact]
    public void Constructor_Should_Construct()
    {
        
        var validConstruction = () => new User("admin", "password", "admin");

        validConstruction.Should().NotThrow();
        validConstruction().Should().BeOfType<User>();
    }

    [Fact]
    public void Constructor_Should_ThrowValidationException()
    {
        var invalidConstruction = () => new User("", "", "");

        invalidConstruction.Should().Throw<FluentValidation.ValidationException>();
    }
}
