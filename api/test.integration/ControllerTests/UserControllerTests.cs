using Domain.Entities;
using FluentAssertions;
using Repository;
using Service.Models.User;
using Common.Extensions;

namespace Test.Integration.ControllerTests;

public sealed class UserControllerTests : BaseTests
{
    private readonly Guid Id;
    private Context Context
        => TestContext.DbContext;
    private readonly Address Address;
    private readonly User User;
    private readonly UserInsertionModel UserInsertionModel;
    private readonly UserViewModel UserViewModel;

    public UserControllerTests()
    {
        Address = new Address("99999999", "cidade teste", "rua", null, "SC", "bairro", "SN");
        User = new User("test user", "test password", Common.Enum.Role.Admin, "test name", "99999999999", "99999999999", Address);
        // TODO popular dados
        UserViewModel = new UserViewModel()
        {
            Name = "test user view",
            Number = "88888888888",
            Cpf = "88888888888",
            Cep = "88888888",
            City = "city 2",
        };

        UserInsertionModel = new UserInsertionModel()
        {
            Name = "test",
        };

        var context = Context;

        Id = context.Add(User).Entity.Id;
        context.SaveChanges();
    }

    [Fact]
    public async Task Get_Should_ReturnUserModel()
    {
        var response = await TestContext.Client.GetAsAsync<UserViewModel>($"user/{Id}");

        response.Should().BeEquivalentTo(User, x => x.ExcludingMissingMembers());
    }

    [Fact]
    public async Task Put_Should_Update()
    {
        var response = await TestContext.Client.PutAsAsync<UserInsertionModel>($"user/{Id}", UserInsertionModel);

        response.EnsureSuccessStatusCode();
        Context.Users.Find(Id).Should().BeEquivalentTo(UserInsertionModel, x => x.ExcludingMissingMembers());
    }

    [Fact]
    public async Task Post_Should_Add()
    {
        var response = await TestContext.Client.PostAsAsync("user", UserInsertionModel);        
        // TODO verificar created result
        response.EnsureSuccessStatusCode();
        Context.Users.Find(Id).Should().BeEquivalentTo(UserInsertionModel, x => x.ExcludingMissingMembers());
    }

    [Fact]
    public async Task Delete_Should_Remove()
    {
        var response = await TestContext.Client.DeleteAsync<UserInsertionModel>($"user/{Id}");

        response.EnsureSuccessStatusCode();

        Context.Users.Find(Id).Should().BeNull();
    }
}
