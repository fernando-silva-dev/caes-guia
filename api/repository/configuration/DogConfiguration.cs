namespace Repository.Configuration;

public class DogConfiguration : IEntityTypeConfiguration<Dog>
{
    public void Configure(EntityTypeBuilder<Dog> builder)
    {
        builder.Property(x => x.Name).HasMaxLength(50);
        builder.Property(x => x.MotherName).HasMaxLength(50);
        builder.Property(x => x.FatherName).HasMaxLength(50);
        builder.Property(x => x.Color).HasMaxLength(25);

        builder.Ignore(x => x.ResponsiblesIds);

        builder.HasMany(x => x.Events).WithOne().HasForeignKey(x => x.DogId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Responsibles).WithMany().UsingEntity<Responsability>();

        builder.HasKey(x => x.Id);
    }
}
