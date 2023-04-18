import { combineReducers } from "redux";
import authReducers from "./auth"

const rootReducer = combineReducers({
    auth: authReducers
});

export default rootReducer;
