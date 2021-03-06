import { Route } from "@angular/router"
import { HomeComponent } from '../components/home/home.component'
import { AuthService } from "../services/authGuard/auth.service"
import { ProductsListComponent } from '../components/products/products-list/products-list.component'
import { AdminProductsListComponent } from '../components/products/admin/admin-products-list/admin-products-list.component'
import { CheckoutComponent } from '../components/paymentCheckout/checkout/checkout.component'
import { InvoiceComponent } from "../components/paymentCheckout/invoice/invoice.component"
interface CustomRoute extends Route {
    children?: Array<CustomRoute>;
    title?: string;
    isVisible?: boolean;
    role?: String
}

export const routes: Array<CustomRoute> = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "products", component: ProductsListComponent, title: "Products", isVisible: false, role: "customer", canActivate: [AuthService] },
    { path: "admin/products", component: AdminProductsListComponent, title: "Products", isVisible: false, role: "admin", canActivate: [AuthService] },
    { path: "checkout", component: CheckoutComponent, title: "checkout", isVisible: false, role: "customer", canActivate: [AuthService] },
    { path: "invoice", component: InvoiceComponent, title: "invoice", isVisible: false, role: "customer", canActivate: [AuthService] },
    { path: "home", component: HomeComponent, title: "Home", isVisible: false, role: "guest" }

]













