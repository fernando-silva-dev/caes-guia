
namespace Repository.Configuration;

public class BroodEventConfiguration : IEntityTypeConfiguration<BroodEvent>
{
    public void Configure(EntityTypeBuilder<BroodEvent> builder)
    {
        builder.HasOne(x => x.Brood).WithMany().HasForeignKey(x => x.BroodId);
        builder.HasOne(x => x.BroodEventTemplate).WithMany().HasForeignKey(x => x.BroodEventTemplateId);
    }
}