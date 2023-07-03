using Service.Models.Event;

namespace Test.Integration.ControllerTests;

public class EventControllerTests : BaseTests
{
    private readonly Guid Id;
    private Context Context
        => TestContext.DbContext;
    private readonly Event Event;
    private readonly EventInsertModel InsertionModel;

    public EventControllerTests()
    {
        var context = Context;
        Dog dog = new("dog name 1", "mother name 1", "father name 1", DateTime.Today, "black", Common.Enum.Status.Filhote);
        var dogId = context.Add(dog).Entity.Id;

        Event = new("description 1", DateTime.MaxValue, dogId);
        InsertionModel = new EventInsertModel() {
            Date = DateTime.Today,
            Description = "description 2",
            DogId = dogId,
            Base64File = "base 64"
         };

        Id = context.Add(Event).Entity.Id;
        context.SaveChanges();
    }

    [Fact]
    public async Task Post_Should_Add()
    {
        var savedEvent = await TestContext.Client.PostAsAsync<EventInsertModel, EventViewModel>("event", InsertionModel);

        savedEvent.Should().BeEquivalentTo(InsertionModel, x => x.ExcludingMissingMembers());
        Context.Events.Find(savedEvent.Id).Should().BeEquivalentTo(InsertionModel, x => x.ExcludingMissingMembers());
    }
}