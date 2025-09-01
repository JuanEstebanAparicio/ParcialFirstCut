import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { InputComponent } from '../components/input/input.component';
import { SelectComponent } from '../components/select/select.component';
import { ButtonComponent } from '../components/button/button.component';
import { LinkComponent } from '../components/link/link.component';
import { CardComponent } from '../components/card/card.component';
import { PrincipalNewsComponent } from '../components/principal-news/principal-news.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ListComponent } from '../components/list/list.component';
import { ModalComponent } from '../components/modal/modal.component';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { UserMenuComponent } from '../components/user-menu/user-menu.component';
@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    ButtonComponent,
    LinkComponent,
    CardComponent,
    PrincipalNewsComponent,
    HeaderComponent,
    SidebarComponent,
    ListComponent,
    ModalComponent,
    UserFormComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    LinkComponent,
    CardComponent,
    PrincipalNewsComponent,
    HeaderComponent,
    SidebarComponent,
    ListComponent,
    ModalComponent,
    UserFormComponent,
    UserMenuComponent
  ]
})
export class SharedModule {}
