import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from "./appRouting.utils"
import { RoutesLinksComponent } from '../components/routes-links/routes-links.component';


@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  declarations: [RoutesLinksComponent],
  exports: [RouterModule, RoutesLinksComponent]
})
export class AppRoutingModule { }
