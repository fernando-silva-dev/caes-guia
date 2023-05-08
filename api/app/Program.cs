using System.Text;
using App;
using Crosscutting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Service;

var builder = WebApplication.CreateBuilder(args);
var key = builder.Configuration.GetValue<string>("TOKEN_KEY") ?? throw new ArgumentNullException("TOKEN_KEY");
var keyBytes = Encoding.ASCII.GetBytes(key);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddScoped<TokenGenerator>();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.InjectDependencies();

builder.Services.AddAutoMapper(typeof(MapperProfile));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(config => config.AddPolicy("allow-all", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
}

var app = builder.Build();

app.Services.MigrateDatabase();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("allow-all");
    app.MapControllers().AllowAnonymous();
}
else
{
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
}

app.Run();
