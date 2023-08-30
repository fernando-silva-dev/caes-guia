namespace Domain.Interfaces.Repository;

public interface IBaseRepository<T> where T : BaseEntity
{
    public T Get(Guid id);

    public IQueryable<T> List();

    public T Add(T entity);

    public void Remove(Guid id);

    public void Update(Guid id, T entity);
}
