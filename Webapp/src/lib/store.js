import { createStore,combineReducers } from 'redux';
import { EventReducer, SegmentReducer } from '@/components/worldmap';

const reducer = combineReducers({
    event: EventReducer,
    segment: SegmentReducer 
});

export const store = createStore(reducer);