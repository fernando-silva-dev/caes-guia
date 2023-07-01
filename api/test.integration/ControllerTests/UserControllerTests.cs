namespace Test.Integration.ControllerTests;

public sealed class UserControllerTests : BaseTests
{
    private readonly Guid Id;
    private Context Context
        => TestContext.DbContext;
    private readonly Address Address;
    private readonly User User;
    private readonly UserInsertionModel UserInsertionModel;

    public UserControllerTests()
    {
        Address = new Address("99999999", "cidade teste", "rua", null, "SC", "bairro", "SN");
        User = new User("test user", "test password", Common.Enum.Role.Admin, "test name", "99999999999", "99999999999", Address);
        
        UserInsertionModel = new UserInsertionModel()
        {
            Name = "test user insert",
            Number = "88888888888",
            Cpf = "88888888888",
            Cep = "88888888",
            City = "city 2",
            Complement = "complement 2",
            District = "district 2",
            Password = "password 2",
            Phone = "88888888888",
            Role = Common.Enum.Role.Operador,
            State = "SP",
            Street = "street 2",
            Username = "username 2",
        };

        var context = Context;

        Id = context.Add(User).Entity.Id;
        context.SaveChanges();
    }
    
    // List should list

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
        var savedUser = await TestContext.Client.PostAsAsync<UserInsertionModel, UserViewModel>("user", UserInsertionModel);
        
        savedUser.Should().BeEquivalentTo(UserInsertionModel, x => x.ExcludingMissingMembers());
        Context.Users.Find(savedUser.Id).Should().BeEquivalentTo(UserInsertionModel, x => x.ExcludingMissingMembers());
    }

    [Fact]
    public async Task Delete_Should_Remove()
    {
        await TestContext.Client.DeleteAsync<UserInsertionModel>($"user/{Id}");

        Context.Users.Find(Id).Should().BeNull();
    }
}
