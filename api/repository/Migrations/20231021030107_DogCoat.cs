using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class DogCoat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Dogs");

            migrationBuilder.AddColumn<int>(
                name: "Coat",
                table: "Dogs",
                type: "integer",
                maxLength: 25,
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Coat",
                table: "Dogs");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Dogs",
                type: "character varying(25)",
                maxLength: 25,
                nullable: true);
        }
    }
}
