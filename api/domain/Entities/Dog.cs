namespace Domain.Entities;

public class Dog : BaseEntity
{
    public Dog(string name, string motherName, string fatherName, DateTime? birthDate, string color, Status status)
    {
        Id = Guid.NewGuid();
        
        Name = name;
        MotherName = motherName;
        FatherName = fatherName;
        BirthDate = birthDate;
        Color = color;
        Status = status;

        new DogValidator().ValidateAndThrow(this);
    }

    protected Dog() { }

    public string Name { get; protected set; }
    public string MotherName { get; protected set; }
    public string FatherName { get; protected set; }
    public DateTime? BirthDate { get; protected set; }
    public string Color { get; protected set; }
    public Status Status { get; protected set; }
    public virtual ICollection<Event> Events { get; protected set; }
    public virtual ICollection<User> Responsibles { get; set; }
    public virtual ICollection<Guid> ResponsiblesIds { get; set; }
}
