namespace Domain.Validators;

public class EventValidator : AbstractValidator<Event>
{
    public EventValidator()
    {
        RuleFor(x => x.Description).MaximumLength(200);
    }
}
