namespace Service.Models.Attachment;

public class AttachmentInsertionModel
{
    public string Name { get; set; }
    public byte[] Content { get; set; }
    public string ContentType { get; set; }
}