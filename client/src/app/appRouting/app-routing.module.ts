import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from "./appRouting.utils"
import { RoutesLinksComponent } from '../components/routes-links/routes-links.component';
import { CartModalComponent } from '../components/cart/cart-modal/cart-modal.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule,
    MatSidenavModule,
    BrowserAnimationsModule,],
  declarations: [RoutesLinksComponent, CartModalComponent],
  exports: [RouterModule, RoutesLinksComponent]
})
export class AppRoutingModule { }
