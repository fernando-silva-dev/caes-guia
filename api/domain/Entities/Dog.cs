namespace Domain.Entities;

public class Dog : BaseEntity
{
    public Dog(string name, DateTime birthDate, string color, Status status, Guid? broodId)
    {
        Id = Guid.NewGuid();

        Name = name;
        BirthDate = birthDate;
        Color = color;
        Status = status;
        BroodId = broodId;

        new DogValidator().ValidateAndThrow(this);
    }

    protected Dog() { }

    public string Name { get; protected set; }
    public DateTime BirthDate { get; protected set; }
    public string Color { get; protected set; }
    public Status Status { get; protected set; }
    public Guid? BroodId { get; protected set; }
    public virtual ICollection<Event> Events { get; protected set; }
    public virtual ICollection<User> Responsibles { get; set; }
    public virtual ICollection<Guid> ResponsiblesIds { get; set; }
    public virtual Brood Brood { get; set; }
}
