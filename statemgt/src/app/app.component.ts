import { Timer, TriggerAction } from './store/reducers/timer.reducer';
import { matcherSelector, TryAction } from './store/reducers/matcher.reducer';
import { Component, OnInit } from '@angular/core';
import { StoreInterface } from './store/store';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectorMatcher } from '@angular/compiler';
import { interval, timer } from 'rxjs';
import { takeUntil, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'statemgt';

  result: string;
  remaining= 0;
  text: string = "";

  constructor(private store: Store<StoreInterface>) {

    this.store.select(matcherSelector).subscribe(data => console.log("Result recorded : " + data))

    this.store.subscribe(data => {
      console.log(data)
      if (this.result!="Success") {
        this.remaining=data.timer.n
        if (this.remaining==0) {
          this.result="Too late";
        }
      }
      if (this.result!="Too late") {
        switch(data.matcher.n) {
          case 0 : this.result="Notry";break;
          case -1 : this.result="Failed";break;
          case 1 : this.result="Success";break;
        } 
      }
    })
  }

  ngOnInit(): void {
    const clockinst = interval(1000).pipe(takeUntil(timer(10000)));
    clockinst.subscribe(() => this.store.dispatch(new TriggerAction()));
  }

  try() {
    console.log("try : "+this.text)
    this.store.dispatch(new TryAction(this.text));
  }
}
