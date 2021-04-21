import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getTokenFromUrl, loginUrl } from "../../spotify";
import { fetchUserProfile, userLogin } from "../../state/ducks/authentication/actions";
import "./login.css";
//Spotify Logo + Login Button Authentication

function Login()
{
	const dispatch = useDispatch();
	const logged = useSelector(state=>state.authentication.isUserLoggedIn);
	const accessToken = useSelector(state=>state.authentication.token.access_token);

	useEffect(()=>{
		if(window.location.hash === "")
			return;
		let hash = getTokenFromUrl();
		dispatch(userLogin(hash));
	});

	useEffect(()=>{
		if(logged){
			dispatch(fetchUserProfile(accessToken));
		}
	},[logged]);

	if(logged){
		console.log("Redirecting to home");
		return (
			<Redirect to='/home'/>);
	}
    
	return (
		<div className="login">
			<img
				src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
				alt=""/>
			<a href = {loginUrl}>Login with Spotify</a>
		</div>
	);
}

export default Login;   