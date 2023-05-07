namespace Service.Interfaces;

public interface IBaseService<TInsertModel, TViewModel> where TInsertModel : class where TViewModel : class
{
    public TViewModel Get(Guid id);

    public IQueryable<TViewModel> List();

    public TViewModel Add(TInsertModel model);

    public void Update(Guid id, TInsertModel model);

    public void Remove(Guid id);
}
