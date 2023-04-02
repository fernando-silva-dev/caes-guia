﻿namespace Domain.Entities;

public class User
{
    public User(string userName, string password, string role, string name, string cpf, string phone, Address address)
    {
        Id = Guid.NewGuid();
        Username = userName;
        Password = password;
        Role = role;
        Name = name;
        CPF = cpf;
        Phone = phone;
        Address = address;

        new UserValidator().ValidateAndThrow(this);
    }

    protected User() { }

    public Guid Id { get; protected set; }
    public string Username { get; protected set; }
    public string Name { get; protected set; }
    public string? Phone { get; protected set; }
    public string? CPF { get; protected set; }
    public string Password { get; protected set; }
    public string Role { get; protected set; }
    public Address? Address { get; protected set; }

    public void SetId(Guid id)
    {
        Id = id;

        new UserValidator().ValidateAndThrow(this);
    }

    public void SetPassword(string password)
    {
        Password = password;
        new UserValidator().ValidateAndThrow(this);
    }
}
