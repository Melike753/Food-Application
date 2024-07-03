using FoodApplication.ContextDBConfig;
using FoodApplication.Models;
using FoodApplication.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var dbconnection = builder.Configuration.GetConnectionString("dbConnection"); // appsetting.json

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<FoodApplicationDBContext>(options => options.UseSqlServer(dbconnection));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<FoodApplicationDBContext>();

builder.Services.AddTransient<IData, Data>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();