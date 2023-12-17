
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BlogContext>(options=> {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectiion"));
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
var app = builder.Build();
app.UseCors("AllowAllOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/blogs", async (BlogContext db) => {

    var blogs= await db.Blogs.OrderBy(blog=>blog.Id).ToListAsync();
   return Results.Ok(blogs);
});


app.MapGet("/api/blogs/{id}", async (BlogContext db, int id) => {
    var blog = await db.Blogs.FindAsync(id);
    if(blog is null)
        return Results.NotFound("Blog not found");
    return Results.Ok(blog);
});

app.MapPost("/api/blogs", async (BlogContext db, Blog newBlog) => {
    db.Blogs.Add(newBlog);
    await db.SaveChangesAsync();
    return Results.Created($"/api/blogs/{newBlog.Id}", newBlog);
});

app.MapPut("/api/blogs/{id}", async (BlogContext db, int id, Blog updatedBlog) => {
    var existingBlog = await db.Blogs.FindAsync(id);
    if (existingBlog == null)
        return Results.NotFound("Blog not found");

    existingBlog.Title = updatedBlog.Title;
    existingBlog.Description = updatedBlog.Description;
    existingBlog.ImageLink = updatedBlog.ImageLink;


    db.Blogs.Update(existingBlog);
    await db.SaveChangesAsync();


    return Results.Ok(existingBlog);
});

app.MapDelete("/api/blogs/{id}", async (BlogContext db, int id) => {
    var existingBlog = await db.Blogs.FindAsync(id);
    if (existingBlog == null)
        return Results.NotFound("Blog not found");

  db.Blogs.Remove(existingBlog);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();

