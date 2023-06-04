using Common.Enum;

namespace Service.Models.Dog;

public class DogInsertionModel
{
    public string Name { get; set; }
    public string MotherName { get; set; }
    public string FatherName { get; set; }
    public DateTime? BirthDate { get; set; }
    public string Color { get; set; }
    public Status Status { get; set; }
    public virtual IEnumerable<Guid> ResponsiblesIds { get; set; }
}
 