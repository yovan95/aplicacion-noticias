import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
  IonicModule.forRoot(), 
  AppRoutingModule,
  IonicStorageModule.forRoot(),
  HttpClientModule],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      SocialSharing,
      InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
