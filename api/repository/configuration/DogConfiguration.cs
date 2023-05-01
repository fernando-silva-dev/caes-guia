namespace Repository.Configuration;

public class DogConfiguration : IEntityTypeConfiguration<Dog>
{
    public void Configure(EntityTypeBuilder<Dog> builder)
    {
        // TODO configurar colunas
        builder.HasMany(x => x.Events).WithOne().HasForeignKey(x => x.DogId);
        builder.HasMany(x => x.Responsibles).WithMany().UsingEntity<Responsability>();

        builder.HasKey(x => x.Id);
    }
}
