import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {HttpClient} from "../providers/http-client/http.client";
import { CacheModule } from "ionic-cache";
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {DevicePage} from '../pages/device/device';
import {UbiServiceProvider} from '../providers/ubi-service/ubi.service';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        DevicePage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        CacheModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        DevicePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpClient,
        UbiServiceProvider]
})
export class AppModule {
}
