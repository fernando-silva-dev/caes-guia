using Microsoft.Extensions.Configuration;

namespace Repository;

public class Context : DbContext
{
    private readonly string _connectionString;
    private readonly bool? _testing;

    protected Context() { }

    public Context(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("default_connection");
        _testing = config.GetValue<bool?>("testing");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        => modelBuilder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly);

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (_testing ?? false)
            optionsBuilder.UseSqlite(_connectionString);
        else
            optionsBuilder.UseNpgsql(_connectionString);
    }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Dog> Dogs { get; set; }
    public virtual DbSet<Responsability> Responsabilities { get; set; }
    public virtual DbSet<Event> Events { get; set; }
    public virtual DbSet<Attachment> Attachments { get; set; }
    public virtual DbSet<Brood> Broods { get; set; }
    public virtual DbSet<BroodEvent> BroodEvents { get; set; }
    public virtual DbSet<BroodEventTemplate> BroodEventTemplates { get; set; }
}
