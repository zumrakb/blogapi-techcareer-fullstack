using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;

var key = new byte[32]; // 256 bits key size
using (var rng = RandomNumberGenerator.Create())
{
    rng.GetBytes(key);
}

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BlogContext>(options=> {
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnectiion"));
});

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
builder.Services.AddAuthorization();
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



app.UseAuthentication();
app.UseAuthorization();

var jwtPolicy = new AuthorizationPolicyBuilder()
    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
    .RequireAuthenticatedUser()
    .Build();





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/signup", async (User user, BlogContext db) =>
{
    
    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Ok("User created successfully");
});

app.MapPost("/login", async (User user, BlogContext db, IConfiguration config) =>
{
    var existingUser = await db.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password);

    if (existingUser == null)
    {
        return Results.BadRequest("Invalid username or password");
    }

    // Create JWT token
    var tokenHandler = new JwtSecurityTokenHandler();
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Name, existingUser.Id.ToString())
        }),
        Expires = DateTime.UtcNow.AddHours(1), // Token expires in 1 hour, adjust as needed
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    var tokenString = tokenHandler.WriteToken(token);

    // Return the token
    return Results.Ok(new { Token = tokenString });
});


 app.MapGet("/api/blogs", async (BlogContext db) => {
    var blogs= await db.Blogs.OrderBy(blog=>blog.Id).ToListAsync();
   
   List<object> response = new List<object>();

    foreach(Blog blog in blogs) {
        var user = await db.Users.FindAsync(blog.CreatedBy);
        if (user == null) 
            return Results.NotFound("User not found");
        
        var responseItem = new{
            blog.Id,
            blog.Title,
            blog.Description,
            blog.ImageLink,
            CreatedBy = new {
                user.Id,
                user.Email,
                user.Name

            }
        };

        response.Add(responseItem);
    };
    return Results.Ok(response);
}).RequireAuthorization(jwtPolicy);


app.MapGet("/api/blogs/{id}", async (HttpContext httpContext, BlogContext db, int id) => {
    var blog = await db.Blogs.FindAsync(id);
    if(blog is null)
        return Results.NotFound("Blog not found");
    
    var createdByUser = await db.Users.FindAsync(blog.CreatedBy);
    if(createdByUser is null) 
        return Results.NotFound("User Not Found");
    
    var response = new {
        blog.Id,
        blog.Title,
        blog.Description,
        blog.ImageLink,
        CreatedBy = new {
            createdByUser.Id,
            createdByUser.Email,
            createdByUser.Name
        }
    };
    return Results.Ok(response);
}).RequireAuthorization(jwtPolicy);

app.MapPost("/api/blogs", async (HttpContext httpContext,BlogContext db, Blog newBlog) =>
{
    var user = httpContext.User.Identity?.Name;
    if (user == null)
        return Results.Unauthorized();

    int userId = int.Parse(user);
    newBlog.CreatedBy = userId;

    db.Blogs.Add(newBlog);
    await db.SaveChangesAsync();

    var createdByUser = await db.Users.FindAsync(userId);

    if(createdByUser == null) 
        return Results.StatusCode(500);

    var response = new
    {
        newBlog.Id,
        newBlog.Title,
        newBlog.Description,
        newBlog.ImageLink,
        CreatedBy = new
        {
            createdByUser.Id,
            createdByUser.Email,
            createdByUser.Name
        }
    };

    return Results.Created($"/api/blogs/{newBlog.Id}", response);
}).RequireAuthorization(jwtPolicy); 

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
}).RequireAuthorization(jwtPolicy);

app.MapDelete("/api/blogs/{id}", async (BlogContext db, int id) => {
    var existingBlog = await db.Blogs.FindAsync(id);
    if (existingBlog == null)
        return Results.NotFound("Blog not found");

  db.Blogs.Remove(existingBlog);
    await db.SaveChangesAsync();

    return Results.NoContent();
}).RequireAuthorization(jwtPolicy);

app.Run();

