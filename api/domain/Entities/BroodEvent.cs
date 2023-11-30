namespace Domain.Entities;

public class BroodEvent : BaseEntity
{
    public virtual BroodEventTemplate BroodEventTemplate { get; set; }
    public virtual ICollection<Event> Events { get; set; }
    public virtual Brood Brood { get; set; }
    public Guid BroodId { get; set; }
    public Guid BroodEventTemplateId { get; set; }
}
