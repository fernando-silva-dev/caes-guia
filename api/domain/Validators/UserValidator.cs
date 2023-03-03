namespace Domain.Validators;

public class UserValidator : AbstractValidator<User> {
    public UserValidator()
    {
        RuleFor(x => x.Username).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Password).MinimumLength(8).MaximumLength(200);
    }
}
