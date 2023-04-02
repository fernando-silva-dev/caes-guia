using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Users", new String[] 
            { "Username", "Password", "Role", "Id", "Name" }, new Object[] 
            { "Admin", "Admin", "Admin", Guid.NewGuid(), "Administrador" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
