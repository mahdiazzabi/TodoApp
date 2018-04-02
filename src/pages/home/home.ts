import { Component,ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams ,Platform} from 'ionic-angular';
import { TodoList } from '../../model/TodoList';
import { ItemsPage } from '../items/items';
import { AngularFireAuth } from 'angularfire2/auth';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { Profile } from '../../model/profile';
import {SpeechRecognition} from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todoList: TodoList[];
  profile = {} as Profile;
  //variable for speech
  isSpeechAvailable=false;
  isListening=false;
  matches:Array<string>=[];
  
  constructor( private toast: ToastController, public navParams: NavParams, private afAuth: AngularFireAuth, 
                public navCtrl: NavController, private alertCtrl: AlertController, private todoService: TodoServiceProvider,
                private speechRecongnition:SpeechRecognition,private platform:Platform,private changeDetectorRef:ChangeDetectorRef) {
    this.profile = navParams.get("profile");
  /*
    platform.ready().then(()=>{
      //check if spechrecognition available or not :/
      this.speechRecongnition.isRecognitionAvailable()
      .then((available:boolean)=>this.isSpeechAvailable=available)
    })
    */
   
  }
  
  ngOnInit() { 
    this.todoService.getList().subscribe(data => {
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
        },
        { text: 'mic',
          cssClass: 'md-mic',
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

  share(item){
    let alert = this.alertCtrl.create({
      title: 'Please enter the mail adresse',
      inputs: [
        {
          name: 'mailAdress',
          placeholder: 'Email'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Share',
          handler: data => {
            this.todoService.shareList(item , data.mailAdress);
          }
        }
      ]
    });
    alert.present();
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
/*
  public startListening():void{
    
    this.isListening=true;
    this.matches=[];
    let options = {
      language :'fr-FR',
      matches:1,
      promt :'Je vous écoute! :)',      // Android only
      showPopup :true,                     // Android only
      showPartial :false 
    }

    this.speechRecongnition.startListening(options)
    .subscribe(
      (matches:Array<string>)=>{
        this.isListening=false;
        this.addwithVocal(matches);
        this.changeDetectorRef.detectChanges();
      },
      (onerror)=>{
        this.isListening=false;
        console.log(onerror);
        this.changeDetectorRef.detectChanges();
      }
    )
    
  }
  
  public stopListening():void{
   // this.speechRecongnition.stopListening();
  }
public addwithVocal(listmot:Array<string>):void{
    if(listmot.length>0)
    { let phrase:Array<string>=[];
       phrase=listmot[0].split(" ");
       let nomList="";
       if((phrase[0].toUpperCase()==="AJOUTER")&&(phrase.length>1))
       {
         for(let i=1;i<phrase.length-1;i++)
         {
          nomList=nomList+phrase[i]+" ";
         }
         nomList=nomList+phrase[phrase.length-1];
         this.todoService.addList(nomList);

       }
       
    }
}
*/

}