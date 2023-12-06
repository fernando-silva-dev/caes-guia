using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class SeedTemplates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("BroodEventTemplates", new string[] {"Description", "RecurrenceRule", "Id"}, new object[] {"Vermífugo", "FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1;", Guid.NewGuid()} );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
