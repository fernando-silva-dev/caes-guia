using Domain.Entities;
using FluentAssertions;
using Newtonsoft.Json.Linq;
using Service.Models.User;

namespace Test.Integration.ControllerTests;

public sealed class UserTests : BaseTests
{
    // TODO expandir sobre essa estratégia de testes de integração
    [Fact]
    public async void Get_Should_ReturnUserModel()
    {
        // Arrange
        var context = TestContext.DbContext;
        Address address = new Address("99999999", "cidade teste", "rua", null, "SC", "bairro", "SN");
        User user = new User("test user", "test password", Common.Enum.Role.Admin, "test name", "99999999999", "99999999999", address);
        var id = context.Add(user).Entity.Id;
        context.SaveChanges();
        // Act
        var response = await TestContext.Client.GetAsync("user/" + id);
        var jsonUserResponse = await response.Content.ReadAsStringAsync();
        var userResponse = JObject.Parse(jsonUserResponse).ToObject<UserViewModel>();
        // Assert
        userResponse.Should().BeEquivalentTo(user, x => x.ExcludingMissingMembers());
    }
}
