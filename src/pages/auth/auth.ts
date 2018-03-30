import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';
import { ProfilePage } from '../profile/profile';
import { Profile } from '../../model/profile';
import { HomePage } from '../home/home';
import{GooglePlus} from '@ionic-native/google-plus';
@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  error : string ;
  user = {} as User;

  profile = {} as Profile;
  constructor(private toast: ToastController,private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,private googleplus:GooglePlus,public platform: Platform) {


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
  loginbygoogle()
  {
    this.afAuth.auth.signInWithPopup(new
      firebase.auth.GoogleAuthProvider()).then(res=>
        {  console.log(res)
          this.navCtrl.setRoot(TabsPage);
         
      }).catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }
  logingoogleplus()
  { 
      if(this.platform.is('core')||this.platform.is('mobileweb'))
    {
      this.afAuth.auth.signInWithPopup(new
        firebase.auth.GoogleAuthProvider()).then(res=>
          {  console.log(res)
            this.navCtrl.setRoot(HomePage);
          
        }).catch(function (error) {
          console.log(JSON.stringify(error))
        });
    }
	
      this.googleplus.login({
        'webClientId':'398864959818-f43kcpmsogjc3ihjgtig8fhf6am3lae3.apps.googleusercontent.com',
        'offline':true
      }).then(res=>{
      this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc=>{
        alert("ok");
        this.navCtrl.setRoot(HomePage);
     
      }).catch(ns=>{
        alert("notsucc");
      })
      })
	
}
}
