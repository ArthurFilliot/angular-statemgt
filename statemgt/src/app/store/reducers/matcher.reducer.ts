
import {customAction} from '../store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface Matcher {
    n:number // 0:notry, -1:failed, 1:success
}

let initialstate : Matcher  = {
    n:0 
}

export function MatcherReducer(state = initialstate , action : customAction )
{
    if( action.type === 'try' ){
        return {
            n: (action.payload==="ArthurFilliot") ? 1 : -1
        }
    }else{
        return state
    }
}

export class TryAction
{
    type : string ='try'
    payload : string 
    
    constructor(payload : string ) {
        this.payload = payload
    }
}

let matcherFS =  createFeatureSelector<Matcher>('matcher')
export let matcherSelector = createSelector(matcherFS, m=>m.n)