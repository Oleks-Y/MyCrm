import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RegisterPageComponent} from './register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/classes/auth.guard";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoryFormComponent } from './category-page/category-form/category-form.component';
import { PositionsFormComponent } from './category-page/category-form/positions-form/positions-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoryPageComponent,
    LoaderComponent,
    CategoryFormComponent,
    PositionsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi : true,
      useClass : TokenInterceptor
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {

}
