using Domain.Interfazes.Repository;

namespace Repository.Repositories;

public sealed class DogRepository : BaseRepository<Dog>, IDogRepository
{
    public DogRepository(Context context) : base(context)
    {
    }
}
