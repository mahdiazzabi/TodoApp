import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

/**
 * Generated class for the ModalItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-item',
  templateUrl: 'modal-item.html',
})
export class ModalItemPage {
  todoItemName : string ;
  todoItemDesc : string ;
  todoItemStatut : Boolean = false;
  uuidTodo : string ;
  
  constructor( private navParams: NavParams, private view : ViewController , private todoService: TodoServiceProvider ) {
    this.uuidTodo = this.navParams.get("uuidTodo");
    
  }

  addItem(){
    this.todoService.addTodoItem(this.todoItemName , this.todoItemDesc , this.todoItemStatut , this.uuidTodo );
    this.closeModal();
   }
  closeModal(){
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalItemPage');
  }

}
