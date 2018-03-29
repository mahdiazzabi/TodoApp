import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { TodoList } from '../../model/TodoList';
import { TodoItem } from '../../model/TodoItem';
import { UUID } from 'angular2-uuid';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoServiceProvider {
  userUid : string ;
  todoListRef$ : AngularFireList<TodoList>;
  todos : TodoItem [] = [] ;
  constructor(private afAuth: AngularFireAuth, private afDataBase : AngularFireDatabase) {
    console.log('Hello TodoServiceProvider Provider');
    this.afAuth.authState.subscribe(auth => { 
      this.userUid = auth.uid ;
      this.todoListRef$ = this.afDataBase.list(`${this.userUid}/todoListes/`);
      
    });
   
  }
 
  public getList(): Observable<TodoList[]>  {
    
    return this.todoListRef$.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    });
  }

  public addList(name: string) {
    
    this.todoListRef$.push({
      uuid : UUID.UUID(),
      name : name , 
      items : [] });
  }

public getListByUuid(uuid: string): Promise<TodoList> {
  return new Promise((resolve, reject) => {
    const todolistRef$ = this.afDataBase.database.ref(`${this.userUid}/todoListes/`).orderByChild("uuid").equalTo(uuid);
  
    todolistRef$.once('value').then((listSnapshot) => {
     
      for (var list in listSnapshot.val()) {
        if (listSnapshot.val()[list]['uuid'] == uuid) {
          if (!listSnapshot.val()[list]['items']) {
            listSnapshot.val()[list]['items'] = [];
          }
          else {
            listSnapshot.val()[list]['items'] = Object.keys(listSnapshot.val()[list]['items']).map(function (item) {
              return listSnapshot.val()[list]['items'][item];
            });
          }
          resolve(listSnapshot.val()[list]);
          break;
        }
      }
    });
  });
}

  public getTodos(uuid: string): Observable<TodoItem[]> {
    this.todos = [];
		this.getListByUuid(uuid).then((val) => {
			for (var key in val['items']) {
				this.todos.push(val['items'][key]);
			}
		});
	
      return Observable.of(this.todos);
  }

 public updateList(list : any){
   
    this.afDataBase.object(`${this.userUid}/todoListes/${list.key}`).update({name : list.name});
 
 }
 
  public deleteList(key: string){
    this.todoListRef$.remove(key);
  }

  public editTodo(listUuid: string, editedItem: TodoItem) {
    /*
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == editedItem.uuid);
    items[index] = editedItem;
    */
  }

  public deleteTodo(listUuid: string, uuid: string) {
    /*
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == uuid);
    if (index != -1) {
      items.splice(index, 1);
    }
    */
  }

  public getListKeyByUid(uuid: string): any {
		return new Promise((resolve, reject) => {
      const todolistRef$ = this.afDataBase.database.ref(`${this.userUid}/todoListes/`).orderByChild("uuid").equalTo(uuid);
		
			todolistRef$.once('value').then((listSnapshot) => {
				var snap = listSnapshot.val();
				for (var list in snap) {
					if (snap[list]['uuid'] == uuid) {
						if (!snap[list]['items']) {
							snap[list]['items'] = [];
						}
						resolve(list);
						break;
					}
				}
			});
		});
}


  public addTodoItem(todoItemName: string, todoItemDesc: string, todoItemStatut: Boolean, uuidList: string) {
    
    let todoItem: TodoItem = { uuid: UUID.UUID(), name: todoItemName, desc: todoItemDesc, complete: todoItemStatut }
    
    this.getListKeyByUid(uuidList).then((listid) => {
      const refTodoItem$ =  this.afDataBase.list(`${this.userUid}/todoListes/${listid}/items`);
      refTodoItem$.push(todoItem).then(() => this.todos.push(todoItem));
     

    })
  }
  
}