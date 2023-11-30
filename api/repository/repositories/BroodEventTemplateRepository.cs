using Domain.Interfaces.Repository;

namespace Repository.Repositories;

public class BroodEventTemplateRepository : BaseRepository<BroodEventTemplate>, IBroodEventTemplateRepository
{
    public BroodEventTemplateRepository(Context context) : base(context)
    {
    }
}
