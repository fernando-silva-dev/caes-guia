namespace Service.Models.Event;

public class EventViewModel : BaseViewModel
{
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public IEnumerable<AttachmentModel> Attachments { get; set; }
    public Guid DogId { get; set; }
}

public class AttachmentModel : BaseViewModel
{
    public string Name { get; set; }
}