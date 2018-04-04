import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthPage } from '../auth/auth';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the ProfileUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-user',
  templateUrl: 'profile-user.html',
})
export class ProfileUserPage {

  name: string ;
  img: string ;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private afAuth: AngularFireAuth) {
  
    this.afAuth.authState.subscribe(auth => {
      this.name = auth.displayName ;
      this.img = auth.photoURL ;
    })

  }

  getAuthState(){
    return this.afAuth.authState;
  }



  logOut(){
    this.afAuth.auth.signOut().then(() => {

      this.navCtrl.setRoot(MyApp);
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUserPage');
  }

}
