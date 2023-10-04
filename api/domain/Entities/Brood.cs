namespace Domain.Entities;

public class Brood : BaseEntity
{
    public virtual Dog Mother { get; set; }
    public virtual Dog Father { get; set; }
    public virtual IEnumerable<Dog> Children { get; set; }
    public string Description { get; protected set; }
}