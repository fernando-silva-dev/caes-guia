using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace repository.Migrations
{
    /// <inheritdoc />
    public partial class AttachmentRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Base64File",
                table: "Events");

            migrationBuilder.AddColumn<Guid>(
                name: "EventId",
                table: "Attachments",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_EventId",
                table: "Attachments",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_Events_EventId",
                table: "Attachments",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_Events_EventId",
                table: "Attachments");

            migrationBuilder.DropIndex(
                name: "IX_Attachments_EventId",
                table: "Attachments");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Attachments");

            migrationBuilder.AddColumn<string>(
                name: "Base64File",
                table: "Events",
                type: "text",
                nullable: true);
        }
    }
}
