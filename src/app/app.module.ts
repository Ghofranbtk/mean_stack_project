import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './components/account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ShopComponent } from './components/shop/shop.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { BlogComponent } from './components/blog/blog.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { RecaptchaFormsModule , RecaptchaModule } from 'ng-recaptcha';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ViewBlogsComponent } from './components/view-blogs/view-blogs.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ErrorComponent } from './components/error/error.component';
import { ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng5SliderModule } from 'ng5-slider';
import { NavComponent } from './components/admin/nav/nav.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ProductsComponent } from './components/admin/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import {MatDialogModule } from '@angular/material/dialog';
import { HistoryComponent } from './components/admin/history/history.component';
import { WishlistComponent } from './components/admin/wishlist/wishlist.component';
import { BlogsComponent } from './components/admin/blogs/blogs.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { FeedbacksComponent } from './components/admin/feedbacks/feedbacks.component';
import { HomeShopComponent } from './components/home-shop/home-shop.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { HomeBlogComponent } from './components/home-blog/home-blog.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { EBlogsComponent } from './components/employee/e-blogs/e-blogs.component';
import { ECustomersComponent } from './components/employee/e-customers/e-customers.component';
import { EFeedbacksComponent } from './components/employee/e-feedbacks/e-feedbacks.component';
import { ENavComponent } from './components/employee/e-nav/e-nav.component';
import { EOrdersComponent } from './components/employee/e-orders/e-orders.component';
import { EProductsComponent } from './components/employee/e-products/e-products.component';
import { EWishlistsComponent } from './components/employee/e-wishlists/e-wishlists.component' ;'@material/button';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    CartComponent,
    ProfilComponent,
    AddProductComponent,
    ContactComponent,
    EditUserComponent,
    ShopComponent,
    WhishlistComponent,
    BlogComponent,
    ViewProductComponent,
    AddBlogComponent,
    ViewBlogComponent,
    ViewBlogsComponent,
    PaymentComponent,
    ResetPasswordComponent,
    ErrorComponent,
    NavComponent,
    HomeAdminComponent,
    ProductsComponent,
    EditProductComponent,
    OrdersComponent,
    CustomersComponent,
    HistoryComponent,
    WishlistComponent,
    BlogsComponent,
    EditBlogComponent,
    FeedbacksComponent,
    HomeShopComponent,
    RelatedProductComponent,
    HomeBlogComponent,
    EmployeeComponent,
    EBlogsComponent,
    ECustomersComponent,
    EFeedbacksComponent,
    ENavComponent,
    EOrdersComponent,
    EProductsComponent,
    EWishlistsComponent
  ],
  imports: [
    HttpClientModule,
    Ng2GoogleChartsModule,
    NgxPaginationModule,
    Ng5SliderModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    MatDialogModule
   
   

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
