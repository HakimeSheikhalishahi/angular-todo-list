import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { TimeagoModule } from 'ngx-timeago';
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    TodoComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    NgxMasonryModule,
    TimeagoModule,
    NgxColorsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ToDoModule { }
