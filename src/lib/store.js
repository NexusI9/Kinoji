import { createStore,combineReducers } from 'redux';
import { TimelineReducer } from '../components/worldmap';

const reducer = combineReducers({
    timeline: TimelineReducer, 
});

export const store = createStore(reducer);