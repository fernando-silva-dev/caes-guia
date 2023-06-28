using App;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Repository;

namespace Test.Integration;

public class TestContext
{
    public HttpClient Client;
    public IServiceProvider Provider;

    public TestContext()
    {
        var app = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder => 
                                    builder.
                                    UseSetting("connectionstrings:default_connection", $"Data Source= {Guid.NewGuid()}_lite.db")
                                    .UseSetting("TOKEN_KEY", "key")
                                    .UseSetting("testing", "true"));

        Client = app.CreateClient();
        Provider = app.Services;
    }

    public Context DbContext
        => Provider.CreateScope().ServiceProvider.GetRequiredService<Context>();
}
