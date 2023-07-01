
const initialState = {
    array: []
}

export default function(state=initialState, action){

    switch(action.type){

        case 'SET_ACTIVE_SEGMENT':
            return ({
                ...state,
                active: action.segment
            });
        
        case 'PUSH_SEGMENT':
            return ({
                ...state,
                array:[...state.array, action.segment]
            });

        case 'GET_ARRAY':
            return({...state});
        
        case 'EMPTY_ARRAY':
            state.initialState = [];
            return({
                ...state,
                array:state.array
            });
        
        default:
            return({...state});
    }

} 