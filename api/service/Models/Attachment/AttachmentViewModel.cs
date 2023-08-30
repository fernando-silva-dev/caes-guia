namespace Service.Models.Attachment;

public class AttachmentViewModel : BaseViewModel
{
    public string Name { get; set; }
    public byte[] Content { get; set; }
    public string ContentType { get; set; }
}
