import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    UPDATE_SUCCESS,
} from "../constants/auth";

const token = localStorage.getItem("accessToken");

const initState = {
    isLoading: false,
    accessToken: token ?? "",
    currentUser: {
        email: '',
        fullName: '',
        phoneNumber: '',
        avatar: '',
        userId: '',
        role: '',
    }
};
export default function authReducers(state = initState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accessToken: action.payload.accessToken,
                currentUser: action.payload.currentUser,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                accessToken: action.payload,
                currentUser: "",
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
            };

        default:
            return state;
    }
}
