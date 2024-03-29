namespace Domain.Entities;

public class Dog : BaseEntity
{
    public Dog(string name, DateTime birthDate, Coat coat, Status status, Sex sex, Guid? broodId)
    {
        Id = Guid.NewGuid();

        Name = name;
        BirthDate = birthDate;
        Coat = coat;
        Status = status;
        BroodId = broodId;
        Sex = sex;

        new DogValidator().ValidateAndThrow(this);
    }

    protected Dog() { }

    public string Name { get; protected set; }
    public DateTime BirthDate { get; protected set; }
    public Coat Coat { get; protected set; }
    public Status Status { get; protected set; }
    public virtual Sex Sex { get; protected set; }
    public Guid? BroodId { get; protected set; }
    public virtual ICollection<Event> Events { get; protected set; }
    public virtual ICollection<User> Responsibles { get; set; }
    public virtual ICollection<Guid> ResponsiblesIds { get; set; }
    public virtual Brood Brood { get; set; }
}
