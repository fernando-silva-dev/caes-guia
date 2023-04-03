using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repository;
using Repository.Repositories;
using Service.Services;

namespace Crosscutting;

public static class DependencyInjectionExtensions
{
    public static void InjectDependencies(this IServiceCollection services)
    {
        services.AddDbContext<Context>();

        services.Scan(x => x.FromAssembliesOf(typeof(UserService)).AddClasses(c => c.InExactNamespaceOf<UserService>()).AsSelf().WithScopedLifetime());
        services.Scan(x => x.FromAssembliesOf(typeof(UserRepository)).AddClasses(c => c.InExactNamespaceOf<UserRepository>()).AsSelf().WithScopedLifetime());
    }

    public static void MigrateDatabase(this IServiceProvider services)
    {
        using (var scope = services.CreateScope())
        {
            var dataContext = scope.ServiceProvider.GetRequiredService<Context>();
            dataContext.Database.Migrate();
        }
    }
}
