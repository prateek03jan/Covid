import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarHeaderComponent } from './nav-bar-header/nav-bar-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavBarHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule
  ],
  exports: [
    NavBarHeaderComponent
  ]
})
export class NavBarModule { }
