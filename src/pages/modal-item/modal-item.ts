import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { UUID } from 'angular2-uuid';

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
  todoItemDesc : string = "" ;
  todoItemStatut : Boolean = false;
  uuidTodo : string ;
  toast: any;
  storage: any;
  UuidImage="";
  base64Image="";
  urlImage = "" ;
  constructor( private navParams: NavParams, private view : ViewController ,
    private camera:Camera,private imagePro:ImageProvider, private todoService: TodoServiceProvider ) {
    this.uuidTodo = this.navParams.get("uuidTodo");
    
  }

  addItem(){
    if(this.base64Image!="")
    {  
       this.imagePro.uploadImage(this.base64Image, this.UuidImage).then(url => {
         this.urlImage = url ;
         this.todoService.addTodoItem(this.todoItemName , this.todoItemDesc , this.todoItemStatut , this.uuidTodo,this.urlImage );
   
       });
      this.base64Image="";
    }else{
      this.todoService.addTodoItem(this.todoItemName , this.todoItemDesc , this.todoItemStatut , this.uuidTodo,"assets/imgs/logo.png" );
   
    }
    this.closeModal();
   }
  closeModal(){
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalItemPage');
  }
  ////////////////ajout d'image
addLibraryPhoto () {
  
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: 0,
    correctOrientation: true
  }
  
  this.savePhoto(options);
}

savePhoto (options) {
 
  let uid = UUID.UUID();
    this.camera.getPicture(options).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.UuidImage=uid;
        
      }, (err) => {
        this.toast.show(err, 5000);
      });
  
}

}
