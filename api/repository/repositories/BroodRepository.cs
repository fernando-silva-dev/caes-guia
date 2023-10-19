using Domain.Interfaces.Repository;

namespace Repository.Repositories;

public class BroodRepository : BaseRepository<Brood>, IBroodRepository
{
    public BroodRepository(Context context) : base(context)
    {
    }

    public override Brood Get(Guid id)
    {
        return Context.Set<Brood>().Include(x => x.Mother).Include(x => x.Father).Include(x => x.Children).SingleOrDefault(x => x.Id == id);
    }
}