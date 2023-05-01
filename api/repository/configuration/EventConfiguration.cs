namespace Repository.Configuration;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        // TODO definir tamanho das colunas
        builder.HasKey(x => x.Id);
    }
}
