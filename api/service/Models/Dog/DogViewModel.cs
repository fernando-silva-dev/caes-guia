using Common.Enum;
using Service.Models.Event;
using Service.Models.User;

namespace Service.Models.Dog;

public class DogViewModel : BaseViewModel
{
    public string Name { get; set; }
    public DateTime? BirthDate { get; set; }
    public Coat Coat { get; set; }
    public Status Status { get; set; }
    public Sex Sex { get; set; }
    public virtual IEnumerable<EventViewModel> Events { get; set; }
    public virtual ICollection<UserViewModel> Responsibles { get; set; }
    // TODO brood
}
