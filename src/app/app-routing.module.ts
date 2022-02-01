import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductsComponent } from './products/products.component';
import { ProvidersComponent } from './providers/providers.component';
import { ReportsComponent } from './reports/reports.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
	{
		path: "productos",
		component: ProductsComponent
	},
	{
		path: "inventario",
		component: InventoryComponent
	},
	{
		path: "clientes",
		component: ClientsComponent
	},
	{
		path: "proveedores",
		component: ProvidersComponent
	},
	{
		path: "reportes",
		component: ReportsComponent
	},
	{
		path: "ventas",
		component: SalesComponent
	},
	{
		path: "",
		component: DashboardComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
