export default function(state=true, action){

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