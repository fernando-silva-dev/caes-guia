using Repository.Repositories;
using Service.Models.Event;

namespace Service.Services;

public class EventService : BaseService<Event, EventInsertModel, EventViewModel>, IEventService
{
    private readonly IAttachmentRepository AttachmentRepository;
    public EventService(IEventRepository repository, IMapper mapper, IAttachmentRepository attachmentRepository) : base(repository, mapper)
    {
        AttachmentRepository = attachmentRepository;
    }

    public override EventViewModel Add(EventInsertModel model)
    {
        var eventEntity = Mapper.Map<Event>(model);
        if (model.AttachmentIds?.Any() == true)
        {

            foreach (var attachmentId in model.AttachmentIds)
            {
                var attachment = AttachmentRepository.Get(attachmentId);
                eventEntity.Attachments.Add(attachment);
            }
        }

        return Mapper.Map<EventViewModel>(Repository.Add(eventEntity));
    }
}
