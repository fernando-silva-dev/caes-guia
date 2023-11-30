namespace Domain.Entities;

public class BroodEventTemplate : BaseEntity
{
    public BroodEventTemplate(string recurrenceRule, string description)
    {
        RecurrenceRule = recurrenceRule;
        Description = description;
    }

    public string RecurrenceRule { get; protected set; }
    public string Description { get; protected set; }
}
