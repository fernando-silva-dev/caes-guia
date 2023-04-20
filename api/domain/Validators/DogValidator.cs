namespace Domain.Validators;

public class DogValidator : AbstractValidator<Dog>
{
    public DogValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
    }
}