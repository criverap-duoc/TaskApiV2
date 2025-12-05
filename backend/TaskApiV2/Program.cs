using TaskApi.Services;

var builder = WebApplication.CreateBuilder(args);

// --- SERVICES ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<TaskRepository>();
var storagePath = "tasks.json";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocal",
        policy => policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:3000", "http://localhost:5173")); // frontend CRA / Vite
});

builder.Services.AddControllers();

var app = builder.Build();

// --- MIDDLEWARE ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors("AllowLocal");

app.MapControllers();

app.MapGet("/", () => "Task API V2 running");

var repo = app.Services.GetRequiredService<TaskRepository>();

repo.LoadFromFile(storagePath);

AppDomain.CurrentDomain.ProcessExit += (s, e) =>
{
    repo.SaveToFile(storagePath);
};


app.Run();
