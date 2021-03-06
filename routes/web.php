<?php

use Illuminate\View\View;
use GuzzleHttp\Middleware;
use App\Http\Controllers\Langs;
use App\Http\Controllers\Pages;
use Illuminate\Routing\RouteUri;
use App\Http\Middleware\CheckAge;
use App\Http\Controllers\Products;
use App\Http\Middleware\CheckUser;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\DB;
use App\Http\Middleware\Supervisor;
use Illuminate\Routing\RouteAction;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Adminstration;
use App\Http\Controllers\OnlinePayment;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DashController;
use App\Http\Controllers\HomeController;
use App\Http\Middleware\CheckNationalid;
use App\Http\Middleware\CheckSupervisor;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WishlistController;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Routing\Route as RoutingRoute;
use App\Http\Controllers\Offers\OfferController;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\PaymentProviderController;
use App\Http\Controllers\HomeControllerAdminstation;
use App\Http\Controllers\authAdminstaration\LoginController;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Symfony\Component\Routing\Route as ComponentRoutingRoute;
use App\Http\Controllers\authAdminstaration\RegisterController;
use App\Http\Controllers\authAdminstaration\VerificationController;
use App\Http\Controllers\authAdminstaration\ResetPasswordController;
use App\Http\Controllers\authAdminstaration\ForgotPasswordController;
use App\Http\Controllers\authAdminstaration\ConfirmPasswordController;
use App\Http\Controllers\authAdminstaration\LoginSupervisorsController;

// define('PaginationCount',7);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!cart.list
|
*/

Route::get('about-us', [Pages::class, 'aboutus'])->name('about-us');
Route::get('blog-details', [Pages::class, 'blogdetails'])->name('blog-details');
Route::get('blog-details-audio', [Pages::class, 'blogdetailsaudio'])->name('blog-details-audio');
Route::get('blog-details-gallery', [Pages::class, 'blogdetailsgallery'])->name('blog-details-gallery');
Route::get('blog-details-link', [Pages::class, 'blogdetailslink'])->name('blog-details-link');
Route::get('blog-details-quote', [Pages::class, 'blogdetailsquote'])->name('blog-details-quote');
Route::get('blog-details-standard', [Pages::class, 'blogdetailsstandard'])->name('blog-details-standard');
Route::get('blog-details-video', [Pages::class, 'blogdetailsvideo'])->name('blog-details-video');
Route::get('blog-left-sidebar', [Pages::class, 'blogleftsidebar'])->name('blog-left-sidebar');
Route::get('blog-masonry', [Pages::class, 'blogmasonry'])->name('blog-masonry');
Route::get('blog-no-sidebar', [Pages::class, 'blognosidebar'])->name('blog-no-sidebar');
Route::get('blog-right-sidebar', [Pages::class, 'blogrightsidebar'])->name('blog-right-sidebar');
Route::get('cart-page', [Pages::class, 'cartpage'])->name('cart-page');
Route::get('checkout', [Pages::class, 'checkout'])->name('checkout');
Route::get('contact', [Pages::class, 'contact'])->name('contact');
Route::get('index', [Pages::class, 'index'])->name('index');
Route::get('index-2', [Pages::class, 'index2'])->name('index-2');
Route::get('login-register', [Pages::class, 'loginregister'])->name('login-register');
Route::get('my-account', [Pages::class, 'myaccount'])->name('my-account');
Route::get('product-details', [Pages::class, 'productdetails'])->name('product-details');
Route::get('shop', [Pages::class, 'shop'])->name('shop');
Route::get('shop-list', [Pages::class, 'shoplist'])->name('shop-list');
Route::get('wishlist', [Pages::class, 'wishlist'])->name('wishlist');

// ==================================================website Males===================================================
Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ],
    function () {

        Route::get('salemail', [Products::class, 'salemail'])->name("salemail");
        Route::get('sendMailNewProducts', [Products::class, 'sendMailNewProducts'])->name("sendMailNewProducts");
        Route::get('sendMailNewOffer', [Products::class, 'sendMailNewOffer'])->name("sendMailNewOffer");
        Route::get('sendMailSpecialPass', [Products::class, 'sendMailSpecialPass'])->name("sendMailSpecialPass");


        // ==================================================website routes===================================================
        Route::get('details/product/{id}', [Products::class, 'showDetails'])->name("showDetails");
        Route::post('comment/{product_id}/{name}', [Products::class, 'comment'])->name("comment");
        Route::get('FashonKing', [Products::class, 'FashonKing'])->name("FashonKing");
        // <<<<<<<<<<<<<<<<<<<<<<all categories>>>>>>>>>>>>>>>>>

        Route::get('Categorie/AllProducts', [Products::class, 'AllProducts'])->name("AllProducts");

        // <<<<<<<<<<<<<<<<<<<<<<male categories>>>>>>>>>>>>>>>>>

        Route::get('Categorie/MaleJeans', [Products::class, 'MaleJeans'])->name("MaleJeans");
        Route::get('Categorie/MaleTeShirt', [Products::class, 'MaleTeShirt'])->name("MaleTeShirt");
        Route::get('Categorie/MaleShoes', [Products::class, 'MaleShoes'])->name("MaleShoes");
        // <<<<<<<<<<<<<<<<<<<<<<female categories>>>>>>>>>>>>>>>>>

        Route::get('Categorie/WomenJeans', [Products::class, 'WomenJeans'])->name("WomenJeans");
        Route::get('Categorie/WomenTeShirt', [Products::class, 'WomenTeShirt'])->name("WomenTeShirt");
        Route::get('Categorie/WomenShoes', [Products::class, 'WomenShoes'])->name("WomenShoes");
        // <<<<<<<<<<<<<<<<<<<<<<kids categories>>>>>>>>>>>>>>>>>

        Route::get('Categorie/KidsJeans', [Products::class, 'KidsJeans'])->name("KidsJeans");
        Route::get('Categorie/KidsTeShirt', [Products::class, 'KidsTeShirt'])->name("KidsTeShirt");
        Route::get('Categorie/KidsShoes', [Products::class, 'KidsShoes'])->name("KidsShoes");

        // <<<<<<<<<<<<<<<<<<<<<<<language>>>>>>>>>>>>>>>>>
        Route::get('langs', [Langs::class, 'langs'])->name("langs");


        Route::get('bestSale', [Products::class, 'bestSale'])->name("bestSale");
        Route::get('welcome', function () {
            return view('welcome');
        });
        Route::get('indexEN', [Products::class, 'indexEN'])->name("indexEN");
        Route::get('indexAR', [Products::class, 'indexAR'])->name("indexAR");
        Route::get('getVideo', [Products::class, 'getVideo'])->name("getVideo");
        // Route::get('index/{lang}', function ($lang) {
        //     App::setLocale($lang);
        //     $products = DB::table('product')->get();
        //     return view("product",compact('products')) ;
        // });

        // <<<<<<<<<<<<<<<<<<<<<<<auth-middelwares adminstation>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        // 'AdminAuthenticated:admins'->middleware('AdminAuthenticated:admins')

        Auth::routes(['verify' => true]);
        Route::get('/home', [HomeController::class, 'index'])->name('home');

        ////////////////adminstration/////////////////////////////////////////////////////////
        Route::GET('/access/admin/register/page', [LoginController::class, 'accessView'])->name('accessView');
        Route::GET('/access/admin/register', [LoginController::class, 'access'])->name('access.admin.register');



        Route::get('/home/adminstration', [HomeControllerAdminstation::class, 'index'])->name('home.adminstration')->middleware('verifiedAdminstration:adminstration');
        Route::GET('showLoginForm', [LoginController::class, 'showLoginForm'])->name('showLoginForm');
        Route::POST('/login/admin', [LoginController::class, 'login'])->name('login.admin');


        Route::GET('/register/admin/showRegistrationForm', [RegisterController::class, 'showRegistrationForm'])->name('showRegistrationForm');



        Route::POST('/register/admin', [RegisterController::class, 'register'])->name('register.admin');


        Route::POST('/email/resend/admin', [VerificationController::class, 'resend'])->name('verification.resend.admin');
        Route::GET('/password/confirm/admin/showConfirmForm', [ConfirmPasswordController::class, 'showConfirmForm'])->name('showConfirmForm');
        Route::POST('/password/confirm/admin', [ConfirmPasswordController::class, 'confirm'])->name('password.confirm.admin');

        Route::GET('/password/reset/admin/showLinkRequestForm', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request.admin');
        Route::POST('/password/reset/admin', [ResetPasswordController::class, 'reset'])->name('password.update.admin');
        Route::GET('/password/reset/{token}/admin/showResetForm', [ResetPasswordController::class, 'showResetForm'])->name('password.reset.admin');

        Route::POST('/password/email/admin', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email.admin');
        Route::get('/reset/newpassowrd', [ForgotPasswordController::class, 'chickCodeRight'])->name('reset.newpassowrd');

        Route::put('updatePass/{email}', [ForgotPasswordController::class, 'updatePass'])->name('updatePass');



        Route::POST('/password/update/admin', [ResetPasswordController::class, 'reset'])->name('password.update.admin');
        Route::GET('/password/logout/admin', [LoginController::class, 'logout'])->name('logout.admin');
        Route::GET('view', [ForgotPasswordController::class, 'view'])->name('view');
        // <<<<<<<<<<<<<<<<<<<<<<<supervisors>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        Route::GET('showLoginForm/supervisor', [LoginSupervisorsController::class, 'showLoginForm'])->name('showLoginForm.supervisor');
        Route::POST('/login/supervisor', [LoginSupervisorsController::class, 'login'])->name('login.supervisor');
        ///////////////////////////////////////////// dash/////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>
        ////////////////admin/////////////////////////////////////////////////////////
        //Route::resource('/wishlist', 'WishlistController', ['except' => ['create', 'edit', 'show', 'update']]);
        // Route::post('store', [WishlistController::class, 'store'])->name('store');
        Route::post('/logout', function () {
            Auth::logout();
            return Redirect::route('FashonKing');
        })->name('logoutt');

        ///////////////////////////////////////////// dash/////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>

        Route::group(['middleware' => ['auth:adminstration']], function () {
            Route::get('dash',[DashController::class,'dash'])->name('dash');
            Route::get('dash/create',[ProductController::class,'create'])->name('dash.create');
            Route::get('dash/index',[ProductController::class,'index'])->name('dash.index');
            Route::get('dash/edit/{id}',[ProductController::class,'edit'])->name('dash.edit');
            Route::post('dash/store',[ProductController::class,'store'])->name('dash.store');
            Route::put('dash/update/{id}',[ProductController::class,'update'])->name('dash.update');
            Route::delete('dash/delete/{id}',[ProductController::class,'delete'])->name('dash.delete');

            Route::get('adminAcecess',[ProductController::class,'adminAcecess'])->name('adminAcecess')->Middleware('CheckAge');
            Route::delete('dash/adminAcecessDdelete/{id}',[ProductController::class,'adminAcecessDdelete'])->name('adminAcecess.delete')->Middleware('CheckAge');
            Route::post('addNationalId',[ProductController::class,'addNationalId'])->name('addNationalId')->Middleware('CheckAge');
            Route::get('closedOrdersDash',[ProductController::class,'closedOrdersDash'])->name('closedOrdersDash');



        });


    }
);
Route::POST('logout', function () {
    auth()->logout();
    return redirect()->back();
})->name('logoutUser');

Route::get('accessSupervisor', function () {
    return view('page404', ['message' => 'access denied only supervisor access this page']);
})->name('accessSupervisor');
///////////////////////////////////////////// cart/////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>
Route::middleware([CheckUser::class])->group(function () {
    Route::get('ppp', [CartController::class, 'productList'])->name('products.list');
    Route::get('cartList', [CartController::class, 'cartList'])->name('cart.list');
    Route::post('cart', [CartController::class, 'addToCart'])->name('cart.store');
    Route::match(['put', 'patch', 'post'], 'update-cart', [CartController::class, 'updateCart'])->name('cart.update');
    Route::get('remove/{id}', [CartController::class, 'removeCart'])->name('cart.remove');
    Route::get('cartStore', [CartController::class, 'cartStore'])->name('cart.cartStore');
    Route::get('clear/{id}', [CartController::class, 'clearAllCart'])->name('cart.clear');
    Route::get('getTotalPrice', [CartController::class, 'getTotalPrice'])->name('getTotalPrice');
    Route::get('getTotalItem', [CartController::class, 'getTotalItem'])->name('getTotalItem');
    Route::post('onlinePayment', [OnlinePayment::class, 'getCheckOutId'])->name('cart.onlinePayment');
    ################Begin paymentGateways Routes ########################
    Route::get('stripe/', [StripePaymentController::class, 'stripe'])->name('offers.checkout');
    Route::post('stripe/post', [StripePaymentController::class, 'stripePost'])->name('stripe.post');
    Route::get('productscart/{price}', [productscart::class, 'productscart'])->name('productscart');


    Route::get('closedOrdersCustomer',[ProductController::class,'closedOrdersCustomer'])->name('closedOrdersCustomer');


});
