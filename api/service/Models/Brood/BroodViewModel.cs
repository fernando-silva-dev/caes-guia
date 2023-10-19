using Service.Models.Dog;

namespace Service.Models.Brood;

public class BroodViewModel : BaseViewModel
{
    public virtual DogViewModel Mother { get; set; }
    public virtual DogViewModel Father { get; set; }
    public virtual IEnumerable<DogViewModel> Children { get; set; }
    public string Description { get; set; }
}
