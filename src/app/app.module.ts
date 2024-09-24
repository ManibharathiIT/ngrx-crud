import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AssociatelistingComponent } from './component/associatelisting/associatelisting.component';
import { AddComponent } from './component/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './Material.Module';
import {AppRoutingModule} from './app-routing.model';
import {HttpClientModule} from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssociateReducer } from './Store/Associate/Associate.Reducer';
import { AssociateEffects } from './Store/Associate/Associate.Effects';
import { AppEffects } from './Store/Common/App.Effects';

@NgModule({
  declarations: [
    AppComponent,
    AssociatelistingComponent,
    AddComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    StoreModule.forRoot({associate:AssociateReducer}),
    EffectsModule.forRoot([AssociateEffects,AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
