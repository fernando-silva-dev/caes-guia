using Service.Models.Attachment;

namespace Service.Services;

public sealed class AttachmentService : BaseService<Attachment, AttachmentInsertionModel, AttachmentViewModel>, IAttachmentService
{
    public AttachmentService(IAttachmentRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}