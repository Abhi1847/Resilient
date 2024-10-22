import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import other from "./other";

export default combineReducers({
    auth,
    message,
    other,
});
