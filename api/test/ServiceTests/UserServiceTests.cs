using AutoMapper;
using Service.Models;

namespace Test.ServiceTests;

public class UserServiceTests
{
    private readonly Mock<UserRepository> RepositoryMock = new();
    private readonly Mock<IMapper> MapperMock = new();

    private readonly User User = new("user", "password", "admin");
    private readonly UserModel Model = new() { Username = "user", Role = "admin" };

    private readonly UserService Service;

    public UserServiceTests()
    {
        Service = new(RepositoryMock.Object, MapperMock.Object);
    }

    [Fact]
    public void GetUser_Should_CallRepositoryAndMapperAndReturn()
    {
        RepositoryMock.Setup(x => x.Login(It.IsAny<string>(), It.IsAny<string>())).Returns(User).Verifiable();
        MapperMock.Setup(x => x.Map<UserModel>(It.IsAny<User>())).Returns(Model).Verifiable();

        var result = Service.Login("user", "password");

        RepositoryMock.Verify(x => x.Login("user", "password"), Times.Once());
        MapperMock.Verify(x => x.Map<UserModel>(User), Times.Once());
        result.Should().Be(Model);
    }
}
