import { Route } from "@angular/router"
import { HomeComponent } from '../components/home/home.component'
import { AuthService } from "../services/authGuard/auth.service"
import { ProductsListComponent } from '../components/products/products-list/products-list.component'
import { AdminProductsListComponent } from '../components/products/admin/admin-products-list/admin-products-list.component'
interface CustomRoute extends Route {
    children?: Array<CustomRoute>;
    title?: string;
    isVisible?: boolean;
    role?: String
}

export const routes: Array<CustomRoute> = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "products", component: ProductsListComponent, title: "Products", isVisible: true, role: "customer", canActivate: [AuthService] },
    { path: "admin/products", component: AdminProductsListComponent, title: "Admin Products", isVisible: true, role: "admin", canActivate: [AuthService] },
    { path: "home", component: HomeComponent, title: "Home", isVisible: true, role: "guest" }
]
