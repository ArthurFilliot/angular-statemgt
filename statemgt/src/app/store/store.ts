
import { ActionReducerMap } from "@ngrx/store";
import { Matcher, MatcherReducer } from './reducers/matcher.reducer';
import { Timer, TimerReducer } from './reducers/timer.reducer';
import { Action } from "rxjs/internal/scheduler/Action";

export interface customAction
{
   type: string,
   payload : any 
}

export interface StoreInterface
{
    matcher: Matcher,
    timer: Timer
}

export const reducers : ActionReducerMap<StoreInterface> =
{
    matcher : MatcherReducer,
    timer   : TimerReducer
}