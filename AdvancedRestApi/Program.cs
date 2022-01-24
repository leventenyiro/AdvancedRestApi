using AdvancedRestApi.Data;
using AdvancedRestApi.Interfaces;
using AdvancedRestApi.Profiles;
using AdvancedRestApi.Services;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Sql
builder.Services.AddDbContext<UserDbContext>(option => option.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=UsersDb;"));

// Dependency injection
builder.Services.AddScoped<IUser, UserService>();

// Automapper
builder.Services.AddAutoMapper(typeof(AutoMapperConfig));

// OData
builder.Services.AddControllers().AddOData(option => option.Select().Filter().OrderBy());

// RateLimiter
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>((options) =>
{
    options.GeneralRules = new List<RateLimitRule>()
    {
        new RateLimitRule()
        {
            Endpoint = "*",
            Limit = 10,
            Period = "3m"
        }
    };
});
builder.Services.AddInMemoryRateLimiting();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// RateLimiter
app.UseIpRateLimiting();

app.Run();