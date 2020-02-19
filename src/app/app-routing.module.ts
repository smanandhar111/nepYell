import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './compos/product/product.component';
import {AddProductComponent} from './compos/add-product/add-product.component';
import {ProductInfoComponent} from './compos/product-info/product-info.component';


const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'product-info/:id', component: ProductInfoComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
