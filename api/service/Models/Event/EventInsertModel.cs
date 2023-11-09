namespace Service.Models.Event;

public class EventInsertModel
{
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public ICollection<Guid> AttachmentIds { get; set; }
    public Guid DogId { get; set; }
}
