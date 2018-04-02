import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
/**
 * Generated class for the DetailsItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-item',
  templateUrl: 'details-item.html',
})
export class DetailsItemPage {
  item : TodoItem ;
  uuidTodo : string ;
  urlimage:string;
  constructor(public navCtrl: NavController, private view : ViewController , public navParams: NavParams,
    private camera:Camera,private imagePro:ImageProvider, private todoService: TodoServiceProvider ) {
    this.item = navParams.get("item");
    this.uuidTodo = navParams.get("uuidTodo");
    if(this.item.UuidImage!="")
    {
     this.urlimage= this.imagePro.getImage(this.item.UuidImage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsItemPage');
  }

}
