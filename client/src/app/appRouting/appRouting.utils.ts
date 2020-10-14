import { Route } from "@angular/router"
import { HomeComponent } from '../components/home/home.component'
import { AuthService } from "../services/authGuard/auth.service"
import { ProductsListComponent } from '../components/products/products-list/products-list.component'

interface CustomRoute extends Route {
    children?: Array<CustomRoute>;
    title?: string;
    isVisible?: boolean;
    role?: String
}

export const routes: Array<CustomRoute> = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "products", component: ProductsListComponent, title: "Products", isVisible: true, role: "customer", canActivate: [AuthService] },
    { path: "home", component: HomeComponent, title: "Home", isVisible: true, role: "guest" }
]
