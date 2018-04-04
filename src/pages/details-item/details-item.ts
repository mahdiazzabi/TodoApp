import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
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
  constructor(public navCtrl: NavController, public zone: NgZone, private view : ViewController , public navParams: NavParams ) {
    this.item = navParams.get("item");
    this.uuidTodo = navParams.get("uuidTodo");
    
  }

  closeModal(){
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsItemPage');
  }

}
