using Microsoft.Extensions.Configuration;

namespace Repository;

public class Context : DbContext
{
    private readonly string? _connectionString;

    public Context(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("default_connection");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        => modelBuilder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly);

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(_connectionString);

    public DbSet<User> Users { get; set; }
}
