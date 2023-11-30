using Repository.Repositories;
using Service.Models.BroodEvent;

namespace Service.Services;

public class BroodEventService : BaseService<BroodEvent, BroodEventInsertionModel, BroodEventViewModel>, IBroodEventService
{
    private readonly IEventRepository EventRepository;
    private readonly IBroodRepository BroodRepository;
    private readonly IBroodEventTemplateRepository BroodEventTemplateRepository;
    public BroodEventService(IBroodEventRepository repository, IMapper mapper, IEventRepository eventRepository, IBroodRepository broodRepository, IBroodEventTemplateRepository broodEventTemplateRepository) : base(repository, mapper)
    {
        EventRepository = eventRepository;
        BroodRepository = broodRepository;
        BroodEventTemplateRepository = broodEventTemplateRepository;
    }

    public override BroodEventViewModel Add(BroodEventInsertionModel model)
    {
        var @event = Mapper.Map<BroodEvent>(model);
        var insercao = Repository.Add(@event);
        var template = BroodEventTemplateRepository.Get(model.BroodEventTemplateId);

        var subEvents = BroodRepository.Get(model.BroodId).Children.Select(d => new Event(template.Description, "", model.Date, d.Id, insercao.Id));

        foreach (var item in subEvents)
        {
            EventRepository.Add(item);
        }

        return Mapper.Map<BroodEventViewModel>(insercao);
    }
}
