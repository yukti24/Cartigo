import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialSharingPageRoutingModule } from './social-sharing-routing.module';

import { SocialSharingPage } from './social-sharing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialSharingPageRoutingModule
  ],
  declarations: [SocialSharingPage]
})
export class SocialSharingPageModule {}
