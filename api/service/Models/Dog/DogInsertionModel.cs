using Common.Enum;

namespace Service.Models.Dog;

public class DogInsertionModel
{
    public string Name { get; set; }
    public DateTime BirthDate { get; set; }
    public Coat Coat { get; set; }
    public Status Status { get; set; }
    public Sex Sex { get; set; }
    public virtual IEnumerable<Guid> ResponsiblesIds { get; set; }
}
