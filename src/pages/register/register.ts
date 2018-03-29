import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  
  user = {} as User;

  constructor(private toast: ToastController, private afAuth : AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  }
  async register(user : User){
    try{
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email , user.password).then(result => {
        console.log(result);
        this.navCtrl.setRoot(ProfilePage);
        this.toast.create({
          message : `Hello ! Please complete your profile. Thank you !`,
          duration : 4000 
        }).present();
      })
      .catch(error => {
        this.toast.create({
          message : error.message,
          duration : 4000 
        }).present();
       this.navCtrl.setRoot(RegisterPage);
       });
    }catch(error){
      this.toast.create({
        message : error.message,
        duration : 4000 
      }).present();
    }
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
