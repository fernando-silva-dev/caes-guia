namespace Service.Models.Event;

public class EventViewModel : BaseViewModel
{
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string Base64File { get; set; }
    public Guid DogId { get; set; }
}
