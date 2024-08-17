import { TASK_ADD, TASK_CREATE, TASK_DELETE } from "./actiontype";

const initialState = {
    task : []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
       
        case TASK_CREATE :
            return {
                ...state,
                task:[...state.task , action.payload] // Push action.payload to the existing array
            };
            case TASK_ADD : 
            return {...state, task : action.payload}
            case TASK_DELETE : 
            return {
               ...state, task:[]
            }
   
        default:
            return state;
    }
};