using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(x => x.Username).HasMaxLength(20);
        builder.Property(x => x.Password).HasMaxLength(200);
        builder.Property(x => x.Role).HasMaxLength(10);
        
        builder.HasKey(x => x.Username);
    }
}