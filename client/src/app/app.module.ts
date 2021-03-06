import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './appRouting/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up-part-one/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { ReactiveFormsModule, FormsModule } from "@angular/forms"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomInterceptorService } from './services/interceptors/custom-interceptor.service';
import { SignUpPartTwoComponent } from './components/sign-up-part-two/sign-up-part-two.component';
import { HomeComponent } from './components/home/home.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { AdminProductItemComponent } from './components/products/admin/admin-product-item/admin-product-item.component';
import { AdminProductsListComponent } from './components/products/admin/admin-products-list/admin-products-list.component';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { EditModalComponent } from './components/products/admin/edit-modal/edit-modal.component';
import { AddModalComponent } from './components/products/admin/add-modal/add-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './components/paymentCheckout/checkout/checkout.component';
import { HighlightSearchPipe } from './pipes/highlightSearchPipe/search-in-cart.pipe';
import { InvoiceComponent } from './components/paymentCheckout/invoice/invoice.component';
import { SearchFilterPipe } from './pipes/filterPipe/search-filter.pipe';
import { SelectFilterPipePipe } from './pipes/selectPipe/select-filter-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    SignUpPartTwoComponent,
    HomeComponent,
    ProductsListComponent,
    ProductItemComponent,
    AdminProductItemComponent,
    AdminProductsListComponent,
    EditModalComponent,
    AddModalComponent,
    CheckoutComponent,
    HighlightSearchPipe,
    InvoiceComponent,
    SearchFilterPipe,
    SelectFilterPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    BrowserAnimationsModule,


  ],
  providers: [{ useClass: CustomInterceptorService, provide: HTTP_INTERCEPTORS, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
