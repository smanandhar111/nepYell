import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { AuthComponent } from './compos/auth/auth.component';
import {AuthService} from './compos/auth/auth.service';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { ProductComponent } from './compos/product/product.component';
import {ProductService} from './compos/product/product.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AddProductComponent } from './compos/add-product/add-product.component';
import {FormsModule} from '@angular/forms';
import { GalleryComponent } from './compos/gallery/gallery.component';
import {ProddisplayColorFilterPipe} from './compos/gallery/pipe/proddisplay-colorfilter.pipe';
import {ProddisplayFilterPipe} from './compos/gallery/pipe/proddisplay-filter.pipe';
import {ProddisplayNotSelfPipe} from './compos/gallery/pipe/proddisplay-notSelf.pipe';
import {ProddisplayPricefilterPipe} from './compos/gallery/pipe/proddisplay-pricefilter.pipe';
import { ProductInfoComponent } from './compos/product-info/product-info.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { RatingComponent } from './compos/rating/rating.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductComponent,
    AddProductComponent,
    GalleryComponent,
    ProddisplayColorFilterPipe,
    ProddisplayFilterPipe,
    ProddisplayNotSelfPipe,
    ProddisplayPricefilterPipe,
    ProductInfoComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
