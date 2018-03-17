import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../model/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

import firebase from 'firebase' ;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile =  {} as Profile ;

  constructor(private toast : ToastController, private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  createProfile(){
    this.afAuth.authState.subscribe(auth => {
      const personRef: firebase.database.Reference = firebase.database().ref(`/profiles/${auth.uid}`);
      personRef.set({ 
        firstName: this.profile.firstName, 
        lastName: this.profile.lastName 
      }).then(data => {
        this.navCtrl.setRoot(HomePage , {profile : this.profile});
        this.toast.create({
          message : "Thank you ! Welcome to your Todo Application",
          duration : 4000 
        }).present();
      })
    })
  }
}
