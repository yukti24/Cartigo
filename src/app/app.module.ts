import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { AppPageComponent } from './pages/app-page/app-page.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturedCategoriesModule } from './components/featured-categories/featured-categories.module';
import { BannerthreeColumnComponent } from './components/BannerthreeColumn/BannerthreeColumn.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { TopbrandsComponent } from './components/topbrands/topbrands.component';
import { BannertwoColumnComponent } from './components/BannertwoColumn/BannertwoColumn.component';
import { BannerthreecolumnsmallComponent } from './components/bannerthreecolumnsmall/bannerthreecolumnsmall.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CompanyComponent } from './pages/company/company.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TermsandconditionComponent } from './pages/termsandcondition/termsandcondition.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import { AgGridModule } from 'ag-grid-angular';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartNavComponent } from './components/cart-nav/cart-nav.component';
import { CartNavComponentComponent } from './components/cart-nav-component/cart-nav-component.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCarouselModule } from 'ng-mat-carousel';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { NguCarouselModule } from '@ngu/carousel';
import { VerticalProductComponent } from './components/vertical-product/vertical-product.component';
import { FlashSaleproductComponent } from './components/flash-saleproduct/flash-saleproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { UserAddressComponent } from './pages/user-address/user-address.component';
import { UserDownloadsComponent } from './pages/user-downloads/user-downloads.component';
import { UserWishlistComponent } from './pages/user-wishlist/user-wishlist.component';
import { UserReviewsComponent } from './pages/user-reviews/user-reviews.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { SafePipe } from './safe.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductTabTwoComponent } from './components/product-tab-two/product-tab-two.component';
import { NgxSpinnerModule } from "ngx-spinner";  
import { LightboxModule } from 'ngx-lightbox';
import { AlertComponent } from './_components';
import { CareerComponent } from './pages/career/career.component';
import { FilterNavComponent } from './components/filter-nav/filter-nav.component';
import { FilterNavComponentComponent } from './components/filter-nav-component/filter-nav-component.component';
import { CartComponent } from './pages/cart/cart.component';
import { Checkout_completeComponent } from './pages/checkout_complete/checkout_complete.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { MidloginComponent } from './pages/midlogin/midlogin.component';

import {NgxPaginationModule} from 'ngx-pagination'
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
//import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicModule, ModalController } from '@ionic/angular';
import { SocialSharingPageModule } from './modals/social-sharing/social-sharing.module';
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';
import { ReturnPolicyComponent } from './pages/return-policy/return-policy.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { Footer1Component } from './components/footer1/footer1.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { Login_phoneComponent } from './pages/login_phone/login_phone.component';
import { UserCouponsComponent } from './pages/user-coupons/user-coupons.component';
import { LoginSmsComponent } from './pages/login-sms/login-sms.component';
import { Login1Component } from './pages/login1/login1.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    CartNavComponent,FilterNavComponent,
    HeaderComponent,
    SideNavContentComponent,
    CartNavComponentComponent,
   BannerthreeColumnComponent,
    HeaderSearchComponent,
    AppPageComponent,
    PortfolioPageComponent,
    ProductHomeComponent,
    ServicesPageComponent,
    TopbrandsComponent,
    BannertwoColumnComponent,
  ProductGridComponent,
  ProductRowComponent,
  ProductTabTwoComponent,
    BannerthreecolumnsmallComponent,
    FooterComponent,
    Footer1Component,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CompanyComponent,
    FaqComponent,
    TermsandconditionComponent,
    LoginComponent,Login_phoneComponent,
    LoginSmsComponent,Login1Component,
    SigninComponent,ProductDetailComponent,
    CheckoutComponent,
    VerticalProductComponent,
FlashSaleproductComponent,
UserMenuComponent,
UserProfileComponent,UserCouponsComponent,
DashboardComponent,UserOrdersComponent,
UserAddressComponent,
UserDownloadsComponent,
UserWishlistComponent,
UserReviewsComponent,
OrderDetailsComponent,
SafePipe,AlertComponent,
CareerComponent,FilterNavComponent,
FilterNavComponentComponent,
 CartComponent,Checkout_completeComponent,
 MidloginComponent,
 PrivacyPolicyComponent,
 SocialShareComponent,ReturnPolicyComponent,
 ResetPasswordComponent

  ],
  imports: [NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeaturedCategoriesModule,
    NgbModule,
    SlickCarouselModule,
    IvyCarouselModule,
    AgGridModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,MatListModule,
    MatSidenavModule,
    
    FlexLayoutModule,
  HttpClientModule,
  CarouselModule,
  IvyCarouselModule,NguCarouselModule,
  MatCarouselModule.forRoot(),
  FormsModule,
  ReactiveFormsModule,
  NgxSpinnerModule,
  NgxSliderModule,
  LightboxModule,
 
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  IonicModule,
  SocialSharingPageModule,
  NgxPullToRefreshModule


  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    SocialSharing,
    GooglePlus,
    Facebook,
    UniqueDeviceID,
    FCM,ModalController,
    SplashScreen
    
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
