import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    UPDATE_SUCCESS
} from "../constants/auth";

export const login = () => {
    return {
        type: LOGIN_REQUEST,
    };
};

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
};

export const loginFail = (payload) => {
    return {
        type: LOGIN_FAIL,
        payload,
    };
};

export const updateSuccess = (payload) => {
    return {
        type: UPDATE_SUCCESS,
        payload,
    };
};

