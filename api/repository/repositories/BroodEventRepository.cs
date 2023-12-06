using Domain.Interfaces.Repository;

namespace Repository.Repositories;

public class BroodEventRepository : BaseRepository<BroodEvent>, IBroodEventRepository
{
    public BroodEventRepository(Context context) : base(context)
    {
    }
}