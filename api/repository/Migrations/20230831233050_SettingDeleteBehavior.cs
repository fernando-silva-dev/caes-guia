using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class SettingDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_Events_EventId",
                table: "Attachments");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_Events_EventId",
                table: "Attachments",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_Events_EventId",
                table: "Attachments");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_Events_EventId",
                table: "Attachments",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id");
        }
    }
}
