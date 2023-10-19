
namespace Repository.Configuration;

public class BroodConfiguration : IEntityTypeConfiguration<Brood>
{
    public void Configure(EntityTypeBuilder<Brood> builder)
    {
        builder.Property(x => x.Description).HasMaxLength(50);

        builder.HasMany(x => x.Children).WithOne(x => x.Brood);
        builder.HasOne(x => x.Mother).WithMany().HasForeignKey(x => x.MotherId);
        builder.HasOne(x => x.Father).WithMany().HasForeignKey(x => x.FatherId);

        builder.HasKey(x => x.Id);
    }
}