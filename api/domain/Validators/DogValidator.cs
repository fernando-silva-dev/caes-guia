namespace Domain.Validators;

public class DogValidator : AbstractValidator<Dog>
{
    public DogValidator()
    {
        RuleFor(x => x.Status).IsInEnum();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Color).MaximumLength(25);
        RuleFor(x => x.BirthDate).NotEmpty();
    }
}
