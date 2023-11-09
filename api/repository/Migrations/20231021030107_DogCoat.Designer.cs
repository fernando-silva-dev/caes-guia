﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Repository;

#nullable disable

namespace repository.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20231021030107_DogCoat")]
    partial class DogCoat
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entities.Attachment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<byte[]>("Content")
                        .HasColumnType("bytea");

                    b.Property<string>("ContentType")
                        .HasColumnType("text");

                    b.Property<Guid?>("EventId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("Domain.Entities.Brood", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<Guid>("FatherId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("MotherId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("FatherId");

                    b.HasIndex("MotherId");

                    b.ToTable("Broods");
                });

            modelBuilder.Entity("Domain.Entities.Dog", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("BroodId")
                        .HasColumnType("uuid");

                    b.Property<int>("Coat")
                        .HasMaxLength(25)
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<int>("Sex")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BroodId");

                    b.ToTable("Dogs");
                });

            modelBuilder.Entity("Domain.Entities.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<Guid>("DogId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("DogId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Domain.Entities.Responsability", b =>
                {
                    b.Property<Guid>("DogId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("DogId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("Responsabilities");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CPF")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasMaxLength(10)
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Entities.Attachment", b =>
                {
                    b.HasOne("Domain.Entities.Event", null)
                        .WithMany("Attachments")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Domain.Entities.Brood", b =>
                {
                    b.HasOne("Domain.Entities.Dog", "Father")
                        .WithMany()
                        .HasForeignKey("FatherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Dog", "Mother")
                        .WithMany()
                        .HasForeignKey("MotherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Father");

                    b.Navigation("Mother");
                });

            modelBuilder.Entity("Domain.Entities.Dog", b =>
                {
                    b.HasOne("Domain.Entities.Brood", "Brood")
                        .WithMany("Children")
                        .HasForeignKey("BroodId");

                    b.Navigation("Brood");
                });

            modelBuilder.Entity("Domain.Entities.Event", b =>
                {
                    b.HasOne("Domain.Entities.Dog", null)
                        .WithMany("Events")
                        .HasForeignKey("DogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.Responsability", b =>
                {
                    b.HasOne("Domain.Entities.Dog", null)
                        .WithMany()
                        .HasForeignKey("DogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.OwnsOne("Domain.Entities.Address", "Address", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("uuid");

                            b1.Property<string>("Cep")
                                .HasColumnType("text");

                            b1.Property<string>("City")
                                .HasColumnType("text");

                            b1.Property<string>("Complement")
                                .HasColumnType("text");

                            b1.Property<string>("District")
                                .HasColumnType("text");

                            b1.Property<string>("Number")
                                .HasColumnType("text");

                            b1.Property<string>("State")
                                .HasColumnType("text");

                            b1.Property<string>("Street")
                                .HasColumnType("text");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.Navigation("Address");
                });

            modelBuilder.Entity("Domain.Entities.Brood", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("Domain.Entities.Dog", b =>
                {
                    b.Navigation("Events");
                });

            modelBuilder.Entity("Domain.Entities.Event", b =>
                {
                    b.Navigation("Attachments");
                });
#pragma warning restore 612, 618
        }
    }
}