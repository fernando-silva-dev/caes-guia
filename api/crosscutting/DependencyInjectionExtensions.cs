using Microsoft.Extensions.DependencyInjection;
using Repository;
using Repository.Repositories;
using Service.Services;

namespace Crosscutting;

public static class DependencyInjectionExtensions
{
    public static void InjectDependencies(this IServiceCollection services){
        services.AddDbContext<Context>();

        services.AddScoped<UserService>();
        services.AddScoped<UserRepository>();
    }
}
