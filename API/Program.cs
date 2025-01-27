using API.Data;
using API.Extentions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Extetion to clean code.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);


var app = builder.Build();

// Configure the http request pipeline.
// Middleware goes on top of pipeline!
app.UseMiddleware<ExeptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200")
);
// Important correct order!
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// create a scope that can dispose of after I finished with it.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    // Asynchronously applies any pending migrations for the context to the database. 
    // Will create the database if it does not already exist.
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
    throw;
}

app.Run();
