import { combineReducers } from "redux";
import appReducer from "./AppReducer";
import postReducer from "./PostReducer";

export default combineReducers({ app: appReducer, posts: postReducer });
