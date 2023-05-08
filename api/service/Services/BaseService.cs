namespace Service.Services;

public abstract class BaseService<TEntity, TInsertModel, TViewModel> : IBaseService<TInsertModel, TViewModel> where TEntity : BaseEntity where TInsertModel : class where TViewModel : BaseViewModel
{

    protected readonly IBaseRepository<TEntity> Repository;
    protected readonly IMapper Mapper;

    protected BaseService() { }

    public BaseService(IBaseRepository<TEntity> repository, IMapper mapper)
    {
        Repository = repository;
        Mapper = mapper;
    }

    public TViewModel Get(Guid id){
        var entity = Repository.Get(id);
        var model = Mapper.Map<TViewModel>(entity);
        return model;
    }

    public IQueryable<TViewModel> List()
        => Mapper.ProjectTo<TViewModel>(Repository.List());

    public TViewModel Add(TInsertModel model)
        => Mapper.Map<TViewModel>(Repository.Add(Mapper.Map<TEntity>(model)));

    public void Update(Guid id, TInsertModel model)
        => Repository.Update(id, Mapper.Map<TEntity>(model));

    public void Remove(Guid id)
        => Repository.Remove(id);
}
