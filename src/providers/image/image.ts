// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the ImageProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {
  userUid : string ;
  constructor(private afAuth: AngularFireAuth,) {
    console.log('Hello ImageProvider Provider');
    this.afAuth.authState.subscribe(auth => { 
      this.userUid = auth.uid ;
     
      
    });
  }
  
  uploadImage(image: string,  photoId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${this.userUid}/${photoId}.jpg`);
    return imageRef.putString(image, 'data_url').then(result => {
      return result.downloadURL ;
    });
  }
  
  
}