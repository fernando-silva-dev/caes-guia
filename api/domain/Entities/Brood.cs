namespace Domain.Entities;

public class Brood : BaseEntity
{
    public Brood(string description, Guid motherId, Guid fatherId)
    {
        Description = description;
        MotherId = motherId;
        FatherId = fatherId;
    }

    public virtual Dog Mother { get; set; }
    public virtual Dog Father { get; set; }
    public virtual IEnumerable<Dog> Children { get; set; }
    public string Description { get; protected set; }
    public Guid MotherId { get; protected set; }
    public Guid FatherId { get; protected set; }
}