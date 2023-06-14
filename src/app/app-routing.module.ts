import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BlogsComponent } from './components/admin/blogs/blogs.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { EmployeeComponent } from './components/admin/employee/employee.component';
import { FeedbacksComponent } from './components/admin/feedbacks/feedbacks.component';
import { HistoryComponent } from './components/admin/history/history.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { WishlistComponent } from './components/admin/wishlist/wishlist.component';
import { BlogComponent } from './components/blog/blog.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EBlogsComponent } from './components/employee/e-blogs/e-blogs.component';
import { ECustomersComponent } from './components/employee/e-customers/e-customers.component';
import { EFeedbacksComponent } from './components/employee/e-feedbacks/e-feedbacks.component';
import { ENavComponent } from './components/employee/e-nav/e-nav.component';
import { EOrdersComponent } from './components/employee/e-orders/e-orders.component';
import { EProductsComponent } from './components/employee/e-products/e-products.component';
import { EWishlistsComponent } from './components/employee/e-wishlists/e-wishlists.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeBlogComponent } from './components/home-blog/home-blog.component';
import { HomeShopComponent } from './components/home-shop/home-shop.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ShopComponent } from './components/shop/shop.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ViewBlogsComponent } from './components/view-blogs/view-blogs.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'account',component:AccountComponent},
  {path:'cart',component:CartComponent},
  {path:'profile/:id',component:ProfilComponent},
  {path:'add-product',component:AddProductComponent},
  {path:'contact',component:ContactComponent},
  {path:'edit-user/:id',component:EditUserComponent},
  {path:'shop',component:ShopComponent},
  {path:'whislist',component:WhishlistComponent},
  {path:'blog',component:BlogComponent},
  {path:'view-product/:id',component:ViewProductComponent},
  {path:'add-blog',component :AddBlogComponent},
  {path:'view-blogs',component :ViewBlogsComponent},
  {path:'view-blog/:id',component:ViewBlogComponent},
  {path:'payment/:id',component:PaymentComponent},
  {path:'reset-password/:token',component:ResetPasswordComponent},
  {path:'error',component:ErrorComponent},
  {path:'nav',component:NavComponent},
  {path:'admin',component:HomeAdminComponent},
  {path:'products',component:ProductsComponent},
  {path:'edit-product/:id',component:EditProductComponent},
  {path:'orders',component:OrdersComponent},
  {path:'customers',component:CustomersComponent},
  {path:'history',component:HistoryComponent},
  {path:'blogs',component:BlogsComponent},
  {path:'wishlists',component:WishlistComponent},
  {path:'feedbacks',component:FeedbacksComponent},
  {path:'edit-blog/:id',component:EditBlogComponent},
  {path:'shop-home',component:HomeShopComponent},
  {path:'related-product',component:RelatedProductComponent},
  {path:'home-blog',component:HomeBlogComponent},
  {path:'employees',component:EmployeeComponent},
  {path:'e-blogs',component:EBlogsComponent},
  {path:'e-customers',component:ECustomersComponent},
  {path:'e-nav',component:ENavComponent},
  {path:'e-orders',component:EOrdersComponent},
  {path:'e-feedbacks',component:EFeedbacksComponent},
  {path:'e-products',component:EProductsComponent},
  {path:'e-wishlists',component:EWishlistsComponent},

  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
