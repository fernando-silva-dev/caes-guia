using Service.Models.Dog;

namespace Service.Models.Brood;

public class BroodInsertionModel
{
    public IEnumerable<DogInsertionModel> Children { get; set; }
    public string Description { get; set; }
    public Guid MotherId { get; set; }
    public Guid FatherId { get; set; }
}
