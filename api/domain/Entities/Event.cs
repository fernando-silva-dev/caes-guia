namespace Domain.Entities;

public class Event : BaseEntity
{
    public Event(string description, DateTime date, Guid dogId)
    {
        Id = Guid.NewGuid();

        Description = description;
        Date = date;
        DogId = dogId;

        new EventValidator().Validate(this);
    }

    public string Description { get; protected set; }
    public DateTime Date { get; protected set; }
    public Guid DogId { get; protected set; }
}
