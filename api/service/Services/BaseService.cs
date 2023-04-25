namespace Service.Services;

public abstract class BaseService<TEntity, TInsertModel, TViewModel> : IBaseService<TInsertModel, TViewModel> where TEntity : BaseEntity where TInsertModel : class where TViewModel : BaseViewModel 
{
    
    protected readonly BaseRepository<TEntity> Repository;
    protected readonly IMapper Mapper;

    public BaseService(BaseRepository<TEntity> repository, IMapper mapper)
    {
        Repository = repository;
        Mapper = mapper;
    }

    public TViewModel Get(Guid id)
        => Mapper.Map<TViewModel>(Repository.Get(id));

    public IQueryable<TViewModel> List()
        => Mapper.ProjectTo<TViewModel>(Repository.List());

    public TViewModel Add(TInsertModel model)
        => Mapper.Map<TViewModel>(Repository.Add(Mapper.Map<TEntity>(model)));

    public void Update(Guid id, TInsertModel model)
        => Repository.Update(id, Mapper.Map<TEntity>(model));

    public void Remove(Guid id)
        => Repository.Remove(id);
}
