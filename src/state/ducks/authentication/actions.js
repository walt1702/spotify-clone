import axios from "axios";
import { SET_USER_PROFILE, USER_LOGIN, USER_LOGOUT } from "./types";

export const userLogin = (token) =>{
	console.log("userLogin",token);
	return ({
		type: USER_LOGIN,
		payload : {
			token
		}
	});
};

export const userLogout = () =>{
	return ({
		type: USER_LOGOUT
	});
};

export const setUserProfile = (profile) =>{
	console.log("setUserProfile",profile);
	return ({
		type:SET_USER_PROFILE,
		payload:{
			profile
		}
	});
};

export const fetchUserProfile = (token) => {
	return (dispatch) =>{
		axios.get("https://api.spotify.com/v1/me",{
			"headers": { 
				"Authorization": `Bearer ${token}`
			} 
		}).then(res=>{
			dispatch(setUserProfile(res.data));
		}).catch(err=>{
			console.log(err);
			dispatch(setUserProfile({}));
		});
	};
};