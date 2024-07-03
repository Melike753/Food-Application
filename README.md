# Food-Application
## Proje Adı: FoodApplication
## Amaç: 
Kullanıcıların yemekleri arayabileceği, yemek detaylarını görüntüleyebileceği, yemekleri sepete ekleyebileceği ya da isterse sepetten kaldırabileceği ve sepetini görüntüleyebileceği bir yemek sipariş uygulaması tasarlanmıştır. <br/>
Bu proje, ASP.NET Core ve Entity Framework Core kullanarak modern web uygulamaları geliştirmek ve kullanıcı dostu bir yemek seçimi ve sipariş sistemi oluşturmak için tasarlanmıştır. <br/><br/>
## Kullanılan Teknolojiler
**1.ASP.NET Core MVC:** <br/>
MVC (Model-View-Controller) mimarisi kullanılarak uygulamanın kullanıcı arayüzü ve iş mantığı ayrılmıştır. <br/><br/>
**2.Entity Framework Core:** <br/>
Code First yaklaşımı ile veri tabanı modellemesi yapılmıştır.<br/>
Veri tabanı yönetimi ve CRUD işlemleri için kullanılmıştır.<br/><br/>
**3.Identity Framework:** <br/>
Kullanıcı kimlik doğrulama ve yetkilendirme işlemleri için kullanılmıştır. <br/>
UserManager ve SignInManager sınıfları ile kullanıcı yönetimi sağlanmıştır. <br/><br/>
**4.Razor Views:** <br/>
Dinamik HTML içeriği oluşturmak için Razor şablon motoru kullanılmıştır. <br/><br/>
**5.Dependency Injection:** <br/>
Bağımlılıkların enjekte edilmesi ve yönetimi için kullanılmıştır. <br/><br/>
**6.Entity Framework Core Migrations:** <br/>
Veri tabanı şemasının yönetimi ve sürüm takibi için kullanılmıştır. <br/><br/>
**7.Partial Views:** <br/>
Sayfa içeriğini parçalara ayırmak ve yeniden kullanılabilirliği artırmak için kullanılmıştır. <br/><br/>
**8.JavaScript ve Ajax:** <br/>
Dinamik içerik yükleme ve kullanıcı etkileşimleri için kullanılmıştır. <br/><br/>

## Veri Tabanı Yapısı <br/>
**FoodApplicationDBContext:** <br/>
- IdentityDbContext<ApplicationUser> sınıfından türetilmiştir.<br/>
- Kullanıcı, sipariş ve sepet verilerini yönetir.<br/><br/>

**Veri Tabanı Tabloları:** <br/>
- Orders: Sipariş bilgilerini saklar. <br/>
- Carts: Kullanıcının sepet bilgilerini saklar.<br/><br/>

## Özellikler ve İş Akışı <br/>
**Kullanıcı Kayıt ve Girişi:** <br/>
- Kullanıcılar sisteme kayıt olabilir ve giriş yapabilir. <br/>
- Giriş yapan kullanıcılar yemekleri arayabilir, sepetlerine ekleyebilir ve sipariş oluşturabilir. <br/><br/>

**Tarif Arama ve Sipariş Verme:** <br/>
- Kullanıcılar yemekleri arayabilir ve detaylarını görebilir. <br/>
- Yemeklerin sipariş edilmesi ve fiyat hesaplaması yapılabilir. <br/><br/>

**Sepet Yönetimi:** <br/>
- Kullanıcılar yemekleri sepete ekleyebilir ve sepetlerini yönetebilir. <br/>
- Sepetten yemek çıkarma ve sepet listesini görüntüleme işlemleri yapılabilir. <br/><br/>

## Projede Kullanılan Tasarım Desenleri <br/>
Tasarım desenleri; kodun daha yönetilebilir, genişletilebilir ve test edilebilir olmasını sağlar. <br/><br/>

**Dependency Injection (Bağımlılık Enjeksiyonu)** <br/><br/>
Projede, ASP.NET Core'un sağladığı bağımlılık enjeksiyonu mekanizması kullanılarak bağımlılıklar yönetilmiştir. <br/>
Bu, Dependency Injection tasarım desenine bir örnektir:  <br/><br/>
```
public RecipeController(UserManager<ApplicationUser> userManager, FoodApplicationDBContext dBContext)
{
    _userManager = userManager; 
    context = dBContext; 
}
```
<br/><br/>

**Repository Pattern** <br/><br/>
CartController sınıfında IData arayüzü kullanılarak veri erişim katmanının soyutlanması sağlanmıştır. <br/>
Bu, Repository Pattern kullanımına bir örnektir: <br/><br/>
```
public CartController(IData data, FoodApplicationDBContext context)
{ 
    this.data = data;
    this.context = context; 
}
```
<br/><br/>

**Model-View-Controller (MVC) Pattern** <br/><br/>
ASP.NET Core MVC kullanarak, MVC Pattern uygulanmıştır. <br/>
Bu desen, uygulamanın üç ana bileşene ayrılmasını sağlar: <br/>
Model (veri), View (kullanıcı arayüzü) ve Controller (iş mantığı).<br/><br/>
Örnek:<br/>
- Model: Order, Cart, ApplicationUser gibi sınıflar veri modelini temsil eder. <br/>
- View: Razor view dosyaları (.cshtml) kullanıcı arayüzünü oluşturur. <br/>
- Controller: RecipeController, HomeController, CartController, AccountController iş mantığını ve kullanıcı etkileşimlerini yönetir. <br/><br/>

**Singleton Pattern** <br/><br/>
ASP.NET Core, bazı hizmetleri (örneğin, ILogger hizmeti) uygulama boyunca tek bir örnek olarak sunar. <br/>
Bu, Singleton Pattern kullanımına bir örnektir: <br/><br/>
```
public HomeController(ILogger<HomeController> logger)
{ 
    _logger = logger; 
} 
```
<br/><br/>
**Task-based Asynchronous Pattern (TAP)** <br/><br/>
Asenkron programlama için kullanılan Task-based Asynchronous Pattern, projede async ve await anahtar kelimeleri ile uygulanmıştır. <br/><br/>
```
public async Task<IActionResult> ShowOrder(OrderRecipeDetails orderRecipeDetails)
{
    // ... 
    var user = await _userManager.GetUserAsync(HttpContext.User); 
    // ... 
}
```
