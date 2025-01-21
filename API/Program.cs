using API.Extentions;
using API.Middleware;


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
app.Run();
