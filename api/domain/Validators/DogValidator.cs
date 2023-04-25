namespace Domain.Validators;

public class DogValidator : AbstractValidator<Dog>
{
    public DogValidator()
    {
        // TODO escrever validações
        RuleFor(x => x.Name).NotEmpty();
    }
}