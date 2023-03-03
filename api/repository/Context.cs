using Microsoft.Extensions.Configuration;

namespace Repository;

public class Context : DbContext
{
    public DbSet<User> Users { get; set; }

        private readonly string _connectionString;

        public Context(IConfiguration config)
        {
            string database = config.GetValue<string>("POSTGRES_DB");
            string dbUser = config.GetValue<string>("POSTGRES_USER");
            string dbPassword = config.GetValue<string>("POSTGRES_PASSWORD");
            string port = config.GetValue<string>("POSTGRES_PORT");
            string server = config.GetValue<string>("POSTGRES_SERVER");

            string connectionString = $"User Id={dbUser};Password={dbPassword};Server={server};Port={port};Database={database};Pooling=true;";

            _connectionString = connectionString;
        }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        => modelBuilder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly);

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(_connectionString);
}
