import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{storage} from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the PicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * ionic
 */

@IonicPage()
@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html',
})
export class PicturePage {

  constructor(private camera:Camera,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePage');
  }
  async takePhoto()
  {
    try{
    const options:CameraOptions={
      quality:50,
      targetHeight:600,
      targetWidth:600,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      correctOrientation:true
    }

    const result=await this.camera.getPicture(options);
    const image=`data:image/jpeg;base64,${result}`;
    const pictures=storage().ref('pictures/photo');

    pictures.putString(image,'data_url');

     
  }catch(e){console.error(e)};
  }
}
