import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUpdateItemPage } from './modal-update-item';

@NgModule({
  declarations: [
    ModalUpdateItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUpdateItemPage),
  ],
})
export class ModalUpdateItemPageModule {}
