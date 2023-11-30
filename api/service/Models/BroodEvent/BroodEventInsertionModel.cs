using Service.Models.Event;

namespace Service.Models.BroodEvent;

public class BroodEventInsertionModel
{
    // public virtual ICollection<EventInsertModel> Events { get; set; }
    public DateTime Date { get; set; }
    public Guid BroodId { get; set; }
    public Guid BroodEventTemplateId { get; set; }
}