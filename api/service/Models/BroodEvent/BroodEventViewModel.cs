using Service.Models.Brood;
using Service.Models.BroodEventTemplate;
using Service.Models.Event;

namespace Service.Models.BroodEvent;

public class BroodEventViewModel : BaseViewModel
{
    public virtual BroodEventTemplateViewModel BroodEventTemplate { get; set; }
    public virtual ICollection<EventViewModel> Events { get; set; }
    public virtual BroodViewModel Brood { get; set; }
}
