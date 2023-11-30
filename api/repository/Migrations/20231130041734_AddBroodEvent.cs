using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class AddBroodEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BroodEventId",
                table: "Events",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BroodEventId1",
                table: "Events",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BroodEventTemplates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RecurrenceRule = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BroodEventTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BroodEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BroodId = table.Column<Guid>(type: "uuid", nullable: false),
                    BroodEventTemplateId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BroodEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BroodEvents_BroodEventTemplates_BroodEventTemplateId",
                        column: x => x.BroodEventTemplateId,
                        principalTable: "BroodEventTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BroodEvents_Broods_BroodId",
                        column: x => x.BroodId,
                        principalTable: "Broods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_BroodEventId",
                table: "Events",
                column: "BroodEventId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_BroodEventId1",
                table: "Events",
                column: "BroodEventId1");

            migrationBuilder.CreateIndex(
                name: "IX_BroodEvents_BroodEventTemplateId",
                table: "BroodEvents",
                column: "BroodEventTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_BroodEvents_BroodId",
                table: "BroodEvents",
                column: "BroodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_BroodEvents_BroodEventId",
                table: "Events",
                column: "BroodEventId",
                principalTable: "BroodEvents",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_BroodEvents_BroodEventId1",
                table: "Events",
                column: "BroodEventId1",
                principalTable: "BroodEvents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_BroodEvents_BroodEventId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_BroodEvents_BroodEventId1",
                table: "Events");

            migrationBuilder.DropTable(
                name: "BroodEvents");

            migrationBuilder.DropTable(
                name: "BroodEventTemplates");

            migrationBuilder.DropIndex(
                name: "IX_Events_BroodEventId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_BroodEventId1",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "BroodEventId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "BroodEventId1",
                table: "Events");
        }
    }
}
