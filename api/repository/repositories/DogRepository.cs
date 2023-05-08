using Domain.Interfazes.Repository;

namespace Repository.Repositories;

public sealed class DogRepository : BaseRepository<Dog>, IDogRepository
{
    public DogRepository(Context context) : base(context)
    {
    }

    public override Dog Add(Dog dog)
    {
        var responsibles = Context.Users.Where(x => dog.ResponsiblesIds.Contains(x.Id)).ToList();
        dog.Responsibles = responsibles;
        return base.Add(dog);
    }

    public override Dog? Get(Guid id)
    {
        return Context.Dogs.Include(x => x.Responsibles).Include(x => x.Events).SingleOrDefault(x => x.Id == id);
    }
}
