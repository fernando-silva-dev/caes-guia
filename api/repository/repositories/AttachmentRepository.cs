using Domain.Interfaces.Repository;

namespace Repository.Repositories;

public sealed class AttachmentRepository : BaseRepository<Attachment>, IAttachmentRepository
{
    public AttachmentRepository(Context context) : base(context)
    {
    }
}