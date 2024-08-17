import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCCESS } from "./actionType";

const initialState = {
    name: "",
    token: null,
    isLoading: false,
    isError: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload,
            };
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, isError: true };
        case LOGOUT_SUCCCESS:
            return { ...state, 
                name: "",
                token: null,
                isLoading: false,
                isError: false,

            };

        default:
            return state;
    }
};