import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

/**
 * Generated class for the SharedListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shared-list',
  templateUrl: 'shared-list.html',
})
export class SharedListPage {

  list: any[] ;

  constructor(private todoService: TodoServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit() { 
    this.todoService.getList().subscribe(data => {
      console.log(data);
      this.list = data;
    }
    );
    
   }

 

   nbrItemNonFini(uuid) {
    let result = 0;
    
    return result ;
    /*
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
    */
  }

  personWhoShare(key){
    console.log(key);
    return "TODO" ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharedListPage');
  }

}
