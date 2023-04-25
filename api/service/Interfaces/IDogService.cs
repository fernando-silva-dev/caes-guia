using Service.Models.Dog;

namespace Service.Interfaces;

public interface IDogService : IBaseService<DogInsertionModel, DogViewModel> { }
