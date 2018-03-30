import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

/**
 * Generated class for the ModalUpdateItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-update-item',
  templateUrl: 'modal-update-item.html',
})
export class ModalUpdateItemPage {

  item : TodoItem ;
  uuidTodo : string ;
   
  constructor(public navCtrl: NavController, private view : ViewController , public navParams: NavParams, private todoService: TodoServiceProvider ) {
    this.item = navParams.get("item");
    this.uuidTodo = navParams.get("uuidTodo");
  }

  update(){
    this.todoService.updateTodo(this.uuidTodo , this.item);
    this.closeModal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalUpdateItemPage');
  }

  closeModal(){
    this.view.dismiss();
  }
}
