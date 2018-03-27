import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { TodoList } from '../../model/TodoList';
import { ItemsPage } from '../items/items';
import { AngularFireAuth } from 'angularfire2/auth';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { Profile } from '../../model/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todoList: TodoList[];
  profile = {} as Profile;

  constructor( private toast: ToastController, public navParams: NavParams, private afAuth: AngularFireAuth, public navCtrl: NavController, private alertCtrl: AlertController, private todoService: TodoServiceProvider) {
    this.profile = navParams.get("profile");
    
    todoService.getList().subscribe(data => {
      this.todoList = data;
    }
    );
   
  }
  
  addTodoList() {
    let alert = this.alertCtrl.create({
      title: 'Add Todo List',
      inputs: [
        {
          name: 'todoListName',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.todoService.addList(data.todoListName);
          }
        }
      ]
    });
    alert.present();
  }
  pushPage(item: TodoList) {
    this.navCtrl.push(ItemsPage, {
      name: item.name,
      uuid: item.uuid
    });
  }

  nbrItemNonFini(uuid) {
    let result = 0;
    this.todoList.forEach(element => {
      if (element.uuid == uuid) {
        if (element.items) {
          element.items.forEach(element => {
            if (!element.complete) {
              result++;
            }
          });
        }

      }
    });
    return result;
  }


  deleteList(item){
    let alert = this.alertCtrl.create({
      title: 'Do you want to delete this list ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.todoService.deleteList(item);
          }
        }
      ]
    });
    alert.present();

  }

  updateList(item){
    let alert = this.alertCtrl.create({
      title: 'Update Todo List',
      inputs: [
        {
          name: 'todoListName',
          placeholder: 'name',
          value : item.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            item.name = data.todoListName ;
            this.todoService.updateList(item);
          }
        }
      ]
    });
    alert.present();
  }
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (!data.email && !data.uid) {
        this.toast.create({
          message: `Connection Lost`,
          duration: 4000
        }).present();
      }
    })
  }
  


}