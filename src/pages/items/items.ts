import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { UUID } from 'angular2-uuid';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  toast: any;
  storage: any;
  public uuidTodo;
  public nameTodo;
  public items: TodoItem[];
  constructor(private modal: ModalController, public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, private todoService: TodoServiceProvider) {
    this.uuidTodo = navParams.get("uuid");
    this.nameTodo = navParams.get("name");
    todoService.getTodos(this.uuidTodo).subscribe(data => {
      this.items = data;
    }
    )
  }

  addItem() {
    console.log(this.uuidTodo);
    const myModal = this.modal.create('ModalItemPage', { uuidTodo: this.uuidTodo });
    
    myModal.present();
  }

  update(item) {
    const updateItemModal = this.modal.create('ModalUpdateItemPage', { item: item, uuidTodo: this.uuidTodo });
    updateItemModal.present();

  }
  details(item) {
    const DetailItemModal = this.modal.create('DetailsItemPage', { item: item, uuidTodo: this.uuidTodo });
    DetailItemModal.present();

  }
  delete(item) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want delete the task ' + item.name + ' ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.todoService.deleteTodo(this.uuidTodo, item.uuid);
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

}
