using Service.Models.Attachment;

namespace App.Controllers;

[ApiController]
[Route("[controller]")]
public class AttachmentController : ControllerBase
{

    private readonly IAttachmentService Service;

    public AttachmentController(IAttachmentService service)
    {
        Service = service;
    }

    [HttpPost]
    public CreatedResult Add(IFormFile file)
    {
        MemoryStream stream = new();
        file.CopyTo(stream);
        var model = new AttachmentInsertionModel() { Content = stream.ToArray(), Name = file.FileName, ContentType = file.ContentType };
        AttachmentViewModel entity = Service.Add(model);
        entity.Content = null;
        return Created($"Attachment/{entity.Id}", entity);
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult Get(Guid id)
    {
        var attachment = Service.Get(id);
        return File(attachment.Content, attachment.ContentType, attachment.Name);
    }
}
