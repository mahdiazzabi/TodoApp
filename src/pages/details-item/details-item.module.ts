import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsItemPage } from './details-item';

@NgModule({
  declarations: [
    DetailsItemPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsItemPage),
  ],
})
export class DetailsItemPageModule {}
