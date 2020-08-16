import { customAction } from '../store';
import { Injectable } from '@angular/core';
import { createEffect , Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, mapTo, takeUntil, mergeMap } from 'rxjs/operators'
import { of, interval, Observable, timer } from 'rxjs';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Matcher } from './matcher.reducer';

const trigger = 'running';

export interface Timer {
    n : number // remaining seconds,
}

let initialstate : Timer  = {
    n:5
}

export function TimerReducer(state = initialstate, action : customAction)
{
    if( action.type === trigger ){
        console.log("triggerAction")
        return {n: state.n===0?0:state.n-action.payload}
    }else{
        return state
    }
}

export class TriggerAction {
    type : string=trigger
    payload : number 
    
    constructor() {
        this.payload = 1
    }
}




@Injectable()
export class TriggerTimerEffect {
    constructor(private actions$: Actions) {}

    triggerTimer$ = createEffect(() => this.actions$
        .pipe(ofType(trigger),
        // switchMap((action$: TriggerAction) => {
        //             const clock = interval(1000)
        //             const timer$ = timer(5000);
        //             const clockinst = clock.pipe(takeUntil(timer$));
        //             let result =  clockinst.pipe(mapTo(action$))
        //             console.log(clockinst)
        //             // let subscribe = clock.subscribe(val => action$)
        //             // setTimeout(()=> subscribe.unsubscribe(), 5000);
        //             // console.log("trigger timer")
        //             return result
        //         }
        //     )
        // )
        mergeMap(() => {
                    const clock = interval(1000)
                    const timer$ = timer(5000);
                    const clockinst = clock.pipe(takeUntil(timer$));
                    let result =  clockinst.pipe(mapTo(new TriggerAction()))
                    console.log(clockinst)
                    // let subscribe = clock.subscribe(val => action$)
                    // setTimeout(()=> subscribe.unsubscribe(), 5000);
                    // console.log("trigger timer")
                    return result
                }
            )
        )
    )
}

