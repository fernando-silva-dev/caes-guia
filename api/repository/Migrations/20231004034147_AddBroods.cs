using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class AddBroods : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FatherName",
                table: "Dogs");

            migrationBuilder.DropColumn(
                name: "MotherName",
                table: "Dogs");

            migrationBuilder.AddColumn<Guid>(
                name: "BroodId",
                table: "Dogs",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Broods",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    MotherId = table.Column<Guid>(type: "uuid", nullable: false),
                    FatherId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Broods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Broods_Dogs_FatherId",
                        column: x => x.FatherId,
                        principalTable: "Dogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Broods_Dogs_MotherId",
                        column: x => x.MotherId,
                        principalTable: "Dogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dogs_BroodId",
                table: "Dogs",
                column: "BroodId");

            migrationBuilder.CreateIndex(
                name: "IX_Broods_FatherId",
                table: "Broods",
                column: "FatherId");

            migrationBuilder.CreateIndex(
                name: "IX_Broods_MotherId",
                table: "Broods",
                column: "MotherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dogs_Broods_BroodId",
                table: "Dogs",
                column: "BroodId",
                principalTable: "Broods",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogs_Broods_BroodId",
                table: "Dogs");

            migrationBuilder.DropTable(
                name: "Broods");

            migrationBuilder.DropIndex(
                name: "IX_Dogs_BroodId",
                table: "Dogs");

            migrationBuilder.DropColumn(
                name: "BroodId",
                table: "Dogs");

            migrationBuilder.AddColumn<string>(
                name: "FatherName",
                table: "Dogs",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MotherName",
                table: "Dogs",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
