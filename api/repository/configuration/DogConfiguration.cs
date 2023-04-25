using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration;

public class DogConfiguration : IEntityTypeConfiguration<Dog>
{
    public void Configure(EntityTypeBuilder<Dog> builder)
    {
        // TODO configurar colunas

        builder.HasKey(x => x.Id);
    }
}
