namespace Domain.Entities;

public class Event : BaseEntity
{
    public Event(string description, string observations, DateTime date, Guid dogId)
    {
        Id = Guid.NewGuid();

        Description = description;
        Date = date;
        DogId = dogId;
        Observations = observations;
        Attachments = new List<Attachment>();

        new EventValidator().Validate(this);
    }

    public string Description { get; protected set; }
    public DateTime Date { get; protected set; }
    public Guid DogId { get; protected set; }
    public string Observations {get; protected set;}
    public ICollection<Guid> AttachmentIds { get; set; }
    public virtual IList<Attachment> Attachments { get; set; }
}
