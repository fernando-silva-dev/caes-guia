using Service.Models.Dog;

namespace App.Controllers;

[Authorize(Roles = "Admin")]
public sealed class DogController : BaseCrudController<DogInsertionModel, DogViewModel> {
    public DogController(IDogService service) : base(service)
    {
    }
}
