import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {authenticationReducer} from "./ducks/authentication";
import {userCollectionReducer} from "./ducks/userCollection";
import { metaDataReducer } from "./ducks/metaData";


const middlewares=[
	thunk,
	logger
];
const store = createStore(combineReducers({
	authentication:authenticationReducer,
	userCollection:userCollectionReducer,
	metaData:metaDataReducer
}),composeWithDevTools(applyMiddleware(...middlewares)));

export default store;