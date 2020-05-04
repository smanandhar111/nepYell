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
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GalleryComponent } from './compos/gallery/gallery.component';
import { ProductInfoComponent } from './compos/product-info/product-info.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { RatingComponent } from './compos/rating/rating.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FoodTypeFilterPipe} from './compos/gallery/pipes/foodTypeFilter.pipe';
import {CitySelectFilterPipe} from './compos/gallery/pipes/citySelectFilter.pipe';
import {SubCityFilterPipe} from './compos/gallery/pipes/subCityFilter.pipe';
import {PriceRangeFilterPipe} from './compos/gallery/pipes/priceRangeFilter.pipe';
import { WeatherComponent } from './compos/weather/weather.component';
import {HttpClientModule} from '@angular/common/http';
import { OpenClosedComponent } from './compos/open-closed/open-closed.component';
import {MatDialogModule} from '@angular/material/dialog';
import { WriteReviewComponent } from './compos/write-review/write-review.component';
import { LoginModalComponent } from './compos/login-modal/login-modal.component';
import {ReviewService} from './compos/write-review/review.service';
import { DisplayReviewComponent } from './compos/display-review/display-review.component';
import { SimilarOnesComponent } from './compos/similar-ones/similar-ones.component';
import { CarouselComponent } from './compos/carousel/carousel.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SearchTermFilterPipe} from './compos/gallery/pipes/searchTermFilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductComponent,
    AddProductComponent,
    GalleryComponent,
    ProductInfoComponent,
    RatingComponent,
    FoodTypeFilterPipe,
    CitySelectFilterPipe,
    SubCityFilterPipe,
    PriceRangeFilterPipe,
    SearchTermFilterPipe,
    WeatherComponent,
    OpenClosedComponent,
    WriteReviewComponent,
    LoginModalComponent,
    DisplayReviewComponent,
    SimilarOnesComponent,
    CarouselComponent
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
    MatCheckboxModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  entryComponents: [WriteReviewComponent, LoginModalComponent],
  providers: [AuthService, ProductService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
