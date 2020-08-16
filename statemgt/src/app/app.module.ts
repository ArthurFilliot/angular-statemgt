import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'

import {reducers } from './store/store';
import { TriggerTimerEffect } from './store/reducers/timer.reducer';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    //EffectsModule.forRoot([TriggerTimerEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
