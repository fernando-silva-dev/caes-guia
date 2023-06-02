namespace Domain.Validators;

public class UserValidator : AbstractValidator<User> {
    public UserValidator()
    {
        RuleFor(x => x.Username).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Password).MinimumLength(8).MaximumLength(200);
        RuleFor(x => x.Name).MaximumLength(1000);
        RuleFor(x => x.Phone).MinimumLength(8).MaximumLength(11);
        RuleFor(x => x.CPF).Length(11);
        RuleFor(x => x.Role).IsInEnum();

        RuleFor(x => x.Address).NotNull().SetValidator(new AddressValidator());
    }
}
