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
  data:TodoList[] = [];
  
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
  public getListbyUuid(uuid : string){
    
  }

  public getTodos(uuid: string): Observable<TodoItem[]> {
   
    return this.todoListRef$.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    });
  }
 public updateList(list : any){
   
    this.afDataBase.object(`${this.userUid}/todoListes/${list.key}`).update({name : list.name});
 
 }
 
  public deleteList(key: string){
    this.todoListRef$.remove(key);
  }

  public editTodo(listUuid: string, editedItem: TodoItem) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == editedItem.uuid);
    items[index] = editedItem;
  }

  public deleteTodo(listUuid: string, uuid: string) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == uuid);
    if (index != -1) {
      items.splice(index, 1);
    }
  }



  public addTodoItem(todoItemName: string, todoItemDesc: string, todoItemStatut: Boolean, uuidList: string) {
    let todoItem: TodoItem = { uuid: UUID.UUID(), name: todoItemName, desc: todoItemDesc, complete: todoItemStatut }
    console.log(this.data.find(list => list.uuid === uuidList).items);
    this.data.find(list => list.uuid === uuidList).items.push(todoItem);
    /*
    //this.DB.list(`${this.basePath}/${todoList.uuid}/items`).push(newtodoItem);
    this.afAuth.authState.subscribe(auth => {
      let ref = this.afDataBase.list(`${auth.uid}/todoListes/${uuidList}/items`).push(todoItem);
    })
    */
  }
  
}