using Service.Models.Event;

namespace Service.Interfaces;

public interface IEventService : IBaseService<EventInsertModel, EventViewModel> { }
