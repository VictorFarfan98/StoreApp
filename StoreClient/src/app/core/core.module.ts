import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirebaseAuthService } from './auth';
//import {} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FirebaseAuthService,
  ],
})
export class CoreModule { }
