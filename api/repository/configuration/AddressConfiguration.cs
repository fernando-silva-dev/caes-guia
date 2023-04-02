using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.HasKey(x => x.UserId);
    }
}