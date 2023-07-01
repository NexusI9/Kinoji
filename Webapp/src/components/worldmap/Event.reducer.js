export default function(state={}, action){

    switch(action.type){

        case 'SET_ACTIVE_POPUP':
            return ({
                ...state,
                token: action.token
            });
        
        default:
            return({...state});
    
    }

} 