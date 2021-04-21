//export everything here

//Action Creators => Directly exported
import {userLogin,userLogout,fetchUserProfile} from "./actions";

//Reducers => Default exported
import authenticationReducer from "./reducer";



export {
	userLogin,
	userLogout,
	//setUserProfile,
	fetchUserProfile,
	authenticationReducer
};