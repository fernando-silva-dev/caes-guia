using Common.Enum;
using Service.Models.Event;
using Service.Models.User;

namespace Service.Models.Dog;

public class DogViewModel : BaseViewModel
{
    public string Name { get; set; }
    public string MotherName { get; set; }
    public string FatherName { get; set; }
    public DateTime? BirthDate { get; set; }
    public string Color { get; set; }
    public Status Status { get; set; }
    public virtual IEnumerable<EventViewModel> Events { get; set; }
    public virtual ICollection<UserViewModel> Responsibles { get; set; }
}
