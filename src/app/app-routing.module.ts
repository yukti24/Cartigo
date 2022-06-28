import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppPageComponent } from './pages/app-page/app-page.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { CompanyComponent } from './pages/company/company.component';
import { TermsandconditionComponent } from './pages/termsandcondition/termsandcondition.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FaqComponent } from './pages/faq/faq.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { UserReviewsComponent } from './pages/user-reviews/user-reviews.component';
import { UserDownloadsComponent } from './pages/user-downloads/user-downloads.component';
import { UserAddressComponent } from './pages/user-address/user-address.component';
import { UserWishlistComponent } from './pages/user-wishlist/user-wishlist.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { Checkout_completeComponent } from './pages/checkout_complete/checkout_complete.component';
import { MidloginComponent } from './pages/midlogin/midlogin.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { CareerComponent } from './pages/career/career.component';
import { ReturnPolicyComponent } from './pages/return-policy/return-policy.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { Login_phoneComponent } from './pages/login_phone/login_phone.component';
import { UserCouponsComponent } from './pages/user-coupons/user-coupons.component';
import { LoginSmsComponent } from './pages/login-sms/login-sms.component';
import { Login1Component } from './pages/login1/login1.component';

const routes: Routes = [
  
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'terms',
    component: TermsandconditionComponent
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'brands',
    component: BrandsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'return-policy',
    component: ReturnPolicyComponent
  },
  {
    path: 'career',
    component: CareerComponent
  },

  {
    path: 'login-phone',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SigninComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'usercoupon',
    component: UserCouponsComponent
  },
  {
    path: 'myorders',
    component: UserOrdersComponent
  },
  {
    path: 'orderdetail',
    component: OrderDetailsComponent
  },
  {
    path: 'reviews',
    component: UserReviewsComponent
  },
  {
    path: 'downloads',
    component: UserDownloadsComponent
  },
  {
    path: 'addresses',
    component: UserAddressComponent
  },
  {
    path: 'wishlist',
    component: UserWishlistComponent
  },
  {
    path: 'socialshare',
    component: SocialShareComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'complete',
    component: Checkout_completeComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'midlogin',
    component: MidloginComponent
  },
  {
   
    path: 'home',
    component: AppPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'social-sharing',
    loadChildren: () => import('./modals/social-sharing/social-sharing.module').then( m => m.SocialSharingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
