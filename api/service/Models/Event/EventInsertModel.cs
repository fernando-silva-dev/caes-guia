namespace Service.Models.Event;

public class EventInsertModel
{
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string Observations { get; set; }
    public ICollection<Guid> AttachmentIds { get; set; }
    public Guid DogId { get; set; }
    public Guid? BroodEventId { get; set; }
}
