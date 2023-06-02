using Common.Enum;

namespace Test.DomainTests.EntityTests;

public class UserTests
{
    [Fact]
    public void Constructor_Should_Construct()
    {
        var address = new Address("89110000", "Gaspar", "Adriano Kormann", "", "SC", "Bela Vista", "SN");
        var validConstruction = () => new User("admin", "password", Role.Admin, "name", "12345678901", "1234567890", address);

        validConstruction.Should().NotThrow();
        validConstruction().Should().BeOfType<User>();
    }

    // TODO transformar em theory e verificar cada problema de validação
    [Fact]
    public void Constructor_Should_ThrowValidationException()
    {
        var invalidConstruction = () => new User("", "", (Role)0, "", "", "", null);

        invalidConstruction.Should().Throw<FluentValidation.ValidationException>();
    }
}
