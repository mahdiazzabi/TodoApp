import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';
import { ProfilePage } from '../profile/profile';
import { Profile } from '../../model/profile';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  error : string ;
  user = {} as User;

  profile = {} as Profile;
  constructor(private toast: ToastController,private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {


  }

  async login(user: User) {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then( result => {
        if (result) {
          const personRef: firebase.database.Reference = firebase.database().ref(`${result.uid}/`);
         
            personRef.child(`profile`).on('value', personSnapshot => {
              this.profile = personSnapshot.val();
              if (this.profile) {
                this.navCtrl.setRoot(HomePage , {profile : this.profile});
                this.toast.create({
                  message : `Hello ${this.profile.firstName} `,
                  duration : 4000 
                }).present();
              } else {
                this.navCtrl.setRoot(ProfilePage);
                this.toast.create({
                  message : `Hello ! Please complete your profile. Thank you !`,
                  duration : 4000 
                }).present();
              }
            });
          
        }
      })
     .catch(error => {
      this.toast.create({
        message : error.message,
        duration : 4000 
      }).present();
     this.navCtrl.setRoot(AuthPage);
     });
    
  }

  loginFb() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        this.navCtrl.setRoot(TabsPage);
      }).catch(function (error) {
        console.log(JSON.stringify(error))
      });
    });
  }
  register() {
    this.navCtrl.push('RegisterPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

}
