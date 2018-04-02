import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthPage } from '../pages/auth/auth';
//components Native 
import {SpeechRecognition} from '@ionic-native/speech-recognition';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AuthPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private speechRecongnition:SpeechRecognition) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      /*
      this.speechRecongnition.hasPermission().then((hasPermission:boolean)=>{
         console.log('Droit d\'utiliser la reconnaissance vocale?:'+hasPermission);
         if(!hasPermission)
         {
           this.requestspeechRecognitionPermission();
         }
      })
    */  
    });
    
  }


  private requestspeechRecognitionPermission():void{

    this.speechRecongnition.requestPermission().then(
      ()=>console.log('Granted'),
      ()=>console.log('Denied')
    )
  }
}
