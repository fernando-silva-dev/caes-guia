namespace Domain.Validators;

public class AddressValidator : AbstractValidator<Address>
{
    public AddressValidator()
    {
        // TODO regras
        RuleFor(x => x.State).Length(2);
    }
}