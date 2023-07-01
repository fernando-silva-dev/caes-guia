using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class AlterEventsAddFile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Base64File",
                table: "Events",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Base64File",
                table: "Events");
        }
    }
}
