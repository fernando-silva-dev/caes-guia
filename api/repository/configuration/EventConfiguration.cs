namespace Repository.Configuration;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.Property(x => x.Description).HasMaxLength(200);
        
        builder.HasKey(x => x.Id);
    }
}
