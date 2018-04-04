import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { TodoList } from '../../model/TodoList';
import { TodoItem } from '../../model/TodoItem';
import { UUID } from 'angular2-uuid';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

//import * as admin from 'firebase-admin';
import * as firebase from'firebase'
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
    /*
    var admin = require("firebase-admin");

    
    admin.initializeApp({
      credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "mytodo-db",
        "private_key_id": "b338a53a6d2a8cfd85adb44563f2236941dda610",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnL1sxg+7puFOo\nTLtt1OwX8F4Pza4i1a3kx0JZ/meex4+wdI2gElAOWOTLtuGsfqEcqRJEkuViH+s8\nMYR8uIdTQotQvhcJ2G0PGV/g6ibU1N/41Ll/fKLBgbOrrTuZpwb1XxBQC+GDT/gt\nngnZQOxaFIfdvBglstT7Rn6H08ZICWj2yxnctYRqI1HhBa/ud0ar+VXqBDV4jguO\nh+YRSZlzaR/35MaPR8/IUa8gYs8bTd0X+q7DdYxAh3VYT/zHPDirbD3lH0avhaI2\nd/87ismIgogRPnB09GsaOhNjDUlZjSkpWdOyDElpwx5BVhipVCmXpG30yO/cTf6N\nVrjLpHQTAgMBAAECggEANaYaLvkF5UVLvzGkYbnWa1YscQjRLQeBzmzsy2E6kja6\n0uaL/gZyXzBCd2a/43EdNUvB+3RiHItemsnPGJDEiEDN4QKm9PdZA+PiIxQwktKe\n7sQgpJrzxYHgDKLCAewZ7Qps+yrc2p0CaG0S/v74+W0mLk7qNsq80seL2f1o3vt0\nirRlyfL57P/WIcvqLA8fW+vhd5J2lANAIOoZ1oddGVS1+zpAUWDIX0UubuFHbYUh\nMQ3jZlqcAb1OG6jfHu+Jt+V1YSJ8paVGw0h7sOX+QAJTvWi4eWH2V6Z6JJ8dliZV\nMwHcR8Zb/oVrive7gM71SQFsTQrhnB0pwJjEZngm7QKBgQDl2l7hYkPTgeNH+e+G\nNc5htZe0lvyA871FCZzJkgRutyCuLgYH7BHchnh0MFuEI7u2j9NVt1NJ5/HcSIzb\nQrcD00w5RAeGxomUF5p7h6J6thuM5XsiTs0x/q22gSetq8E+diC19NVtAR7+HIiO\nJyOMOjJ5w6Tl+rTC7dDc2n7Y5wKBgQC6NAId0+xQsyfCKSK2qIVn1OWtCo3ah1Ze\nxLm0d4N/Bg1tTbqlTFzZ97QR/mCsh0UjAW4oVcLIlVjgMZjFs1pt6T5z6v1Gxuhk\nIHHbyur6X4Il1W8VRsbu+uDysRrts7nGa8e9x4Ez+zb9VLe++pj7rieB5VnJJXiD\nmQQrktNJ9QKBgH58DHo6eNiLQWb6QrS4Jzndk/3smEbd2emDwKOrloTWgUVYTjlN\nzwZreR12/uVYRJPR0Zn5p/ujh5SQ1/JQZCXWwLtClGG2Hz8/PeN8YAzm6YI/ReM7\nOe+pFi64I/2N5mlY1+dJM6koVMXBLeQL5aPk4qHe538m1xHtjGH8WpFBAoGBAJYN\nRUteNYjO5xJLbgL+iQskgLXS1H+vIoYaSIDK8vfRG87ina+JeyXXvI/ni2ZdV/Se\nuXPdsKtN1yJMNY3UO+Jo3QAy9UotDqdpkfeKbZO4lbwBZJQjxjpdiBtrZ4T4mZPx\n1TP1awRFxImf1LcdYV0oegPunE1BWf3KuJaYqpZlAoGBANRRtB5SbQWhYa6iOsxp\nkHAIVKiSW6b7StyP27cuVJxBLwgaVue1j2J5/IASF6fND1iekA8aWfBI3NiXh6pw\nsECQsjQqBojKbNu2X2nH9mRGvCyItK9RgqczvQ9yG+bVDPEhmFiRx/iYdF3V4tk8\nurUJ/R9i7j+mRX9fZnwo6Bmq\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-4vr27@mytodo-db.iam.gserviceaccount.com",
        "client_id": "106991237274117904247",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4vr27%40mytodo-db.iam.gserviceaccount.com"
      }),
      databaseURL: "https://mytodo-db.firebaseio.com"
    });
    */
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

  public getListShared(): Observable<TodoList[]>{

    const ListSharedRef$ = this.afDataBase.list(`${this.userUid}/sharedList/`);

    return ListSharedRef$.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    });
  }
  
  public shareList(list : TodoList , mail : string){
   /*
    admin.auth().getUserByEmail(mail).then(userRecord => {
      let ref = firebase.database().ref(`${userRecord.uid}/sharedList/${this.userUid}`);
      ref.push(list.$key);
    
    // See the UserRecord reference doc for the contents of userRecord.
    alert(userRecord.uid)
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    alert(error)
    console.log("Error fetching user data:", error);
  });

*/

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

  public updateTodo(listUuid: string, editedItem: any) {
    this.getItemKeyByUuid(editedItem.uuid,listUuid).then((keyItem)=>{
      this.getListKeyByUuid(listUuid).then((listKey) => {
        this.afDataBase.object(`${this.userUid}/todoListes/${listKey}/items/${keyItem}`).update({name : editedItem.name , desc : editedItem.desc , complete : editedItem.complete});
      })
    })
  }

  public deleteTodo(listUuid: string, uuid: string) {
   
    this.getItemKeyByUuid(uuid , listUuid).then( itemKey => {
      this.getListKeyByUuid(listUuid).then(listKey => {
        this.afDataBase.list(`${this.userUid}/todoListes/${listKey}/items/${itemKey}`).remove().then(() => {
          let index = this.todos.findIndex(value => value.uuid == uuid);
          if (index != -1) {
            this.todos.splice(index, 1);
          }
          })
               
        });
     
    });
  }
 public getItemKeyByUuid(uuidTodo: string , uuidList : string){
    return new Promise((resolve , reject) => {
      this.getListKeyByUuid(uuidList).then( (keyList) => {
        const ItemRef$ = this.afDataBase.database.ref(`${this.userUid}/todoListes/${keyList}/items/`).orderByChild("uuid").equalTo(uuidTodo);
        ItemRef$.once('value').then((listSnapshot) => {
          var snap = listSnapshot.val();
            for (var key in snap) {
              if (snap[key]['uuid'] == uuidTodo) {
                resolve(key);
                break;
              }
            }
        })
      })
   
    });
 }
 
  public getListKeyByUuid(uuid: string): any {
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


  public addTodoItem(todoItemName: string, todoItemDesc: string, todoItemStatut: Boolean, uuidList: string,urlImage:string) {
    
    let todoItem: TodoItem = { uuid: UUID.UUID(), name: todoItemName, desc: todoItemDesc, complete: todoItemStatut,urlImage:urlImage }
    
    this.getListKeyByUuid(uuidList).then((listid) => {
      const refTodoItem$ =  this.afDataBase.list(`${this.userUid}/todoListes/${listid}/items`);
      refTodoItem$.push(todoItem).then(() => this.todos.push(todoItem));
    })
  }
  
}