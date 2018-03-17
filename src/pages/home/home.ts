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

  constructor(private toast: ToastController, public navParams: NavParams, private afAuth: AngularFireAuth, public navCtrl: NavController, private alertCtrl: AlertController, private todoService: TodoServiceProvider) {
    this.profile = navParams.get("profile");
    todoService.getList().subscribe(data => {
      this.todoList = data;
    }
    );
  }

  addTodoList() {
    let alert = this.alertCtrl.create({
      title: 'Ajouter Todo Liste',
      inputs: [
        {
          name: 'todoListName',
          placeholder: 'nom'
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
          text: 'Ajouter',
          handler: data => {
            this.todoService.addTodo(data.todoListName);
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