import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemsPage } from '../pages/items/items';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AuthPage } from '../pages/auth/auth';
import { ProfilePage } from '../pages/profile/profile';
import { TodoServiceProvider } from '../providers/todo-service/todo-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import{GooglePlus} from '@ionic-native/google-plus';
import{Camera} from '@ionic-native/camera';
import { PicturePage } from '../pages/picture/picture';
//Native componznts
import { ImageProvider } from '../providers/image/image';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBBWLEUyu5PIFpFW5eeDuZGWENP7k8y8g4",
  authDomain: "mytodo-db.firebaseapp.com",
  databaseURL: "https://mytodo-db.firebaseio.com",
  projectId: "mytodo-db",
  storageBucket: "mytodo-db.appspot.com",
  messagingSenderId: "398864959818"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemsPage,
    AuthPage,
    ProfilePage,
    PicturePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemsPage,
    AuthPage,
    ProfilePage,
    PicturePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoServiceProvider,
    AuthServiceProvider,
    GooglePlus,
    Camera,,
    SpeechRecognition,
    ImageProvider
  ]
})
export class AppModule {}
