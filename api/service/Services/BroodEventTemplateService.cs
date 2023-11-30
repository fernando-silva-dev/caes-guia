using Service.Models.BroodEventTemplate;

namespace Service.Services;

public class BroodEventTemplateService : BaseService<BroodEventTemplate, BroodEventTemplateInsertionModel, BroodEventTemplateViewModel>, IBroodEventTemplateService
{
    public BroodEventTemplateService(IBroodEventTemplateRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}
