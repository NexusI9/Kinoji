const initialState = {
    colours:[],
    lights:[],
    subjects:[]
}

export default function ({state=initialState, action}){

    switch(action.type){

        case 'ADD_COLOUR':
            return ({
                ...state,
                colours: [...new Set([...state.colours, action.colour])]
            });

          
        default:
            return({...state});
    }
}