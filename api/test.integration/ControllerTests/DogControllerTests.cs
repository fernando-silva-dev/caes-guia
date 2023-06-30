using Service.Models.Dog;

namespace Test.Integration.ControllerTests;

public class DogControllerTests : BaseTests
{
    private readonly Guid Id;
    private Context Context
        => TestContext.DbContext;
    private readonly DogInsertionModel InsertionModel;
    private readonly Dog Dog;

    public DogControllerTests()
    {
        Dog = new("dog name 1", "mother name 1", "father name 1", DateTime.Today, "black", Common.Enum.Status.Filhote);
        InsertionModel = new()
        {
            BirthDate = DateTime.MaxValue,
            Status = Common.Enum.Status.Reprovado,
            Color = "brown",
            FatherName = "father name 2",
            MotherName = "mother name 2",
            Name = "dog name 2",
        };

        var context = Context;

        Id = context.Add(Dog).Entity.Id;
        context.SaveChanges();
    }

    [Fact]
    public async Task Post_Should_Add()
    {
        var savedDog = await TestContext.Client.PostAsAsync<DogInsertionModel, DogViewModel>("dog", InsertionModel);

        savedDog.Should().BeEquivalentTo(InsertionModel, x => x.ExcludingMissingMembers());
        Context.Dogs.Find(savedDog.Id).Should().BeEquivalentTo(InsertionModel, x => x.ExcludingMissingMembers());
    }

}
