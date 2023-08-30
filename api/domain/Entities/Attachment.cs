namespace Domain.Entities;

public class Attachment : BaseEntity
{
    public Attachment(string name, byte[] content, string contentType)
    {
        Name = name;
        Content = content;
        ContentType = contentType;
    }

    public string Name { get; protected set; }
    public byte[] Content { get; protected set; }
    public string ContentType { get; protected set; }
}
