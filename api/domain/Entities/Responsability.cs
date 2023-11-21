namespace Domain.Entities;

public class Responsability
{
    public Guid DogId { get; set; }
    public Guid UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public ResponsabilityType ResponsabilityType { get; set; }
}
