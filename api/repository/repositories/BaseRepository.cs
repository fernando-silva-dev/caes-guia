using Domain.Interfazes.Repository;

namespace Repository.Repositories;

public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
{
    protected readonly Context Context;

    public BaseRepository(Context context)
    {
        Context = context;
    }

    public T? Get(Guid id)
        => Context.Set<T>().SingleOrDefault(x => x.Id == id);

    public IQueryable<T> List()
        => Context.Set<T>();

    public T Add(T entity)
    {
        var result = Context.Add(entity);
        Context.SaveChanges();

        return result.Entity;
    }

    public void Remove(Guid id)
    {
        T? entity = Context.Set<T>().SingleOrDefault(x => x.Id == id);

        if (entity is not null)
        {
            Context.Set<T>().Remove(entity);
            Context.SaveChanges();
        }
    }

    public void Update(Guid id, T entity)
    {
        entity.Id = id;
        Context.Set<T>().Update(entity);
        Context.SaveChanges();
    }
}
