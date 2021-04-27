import React, { useEffect, useState } from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchSearchText, setSearchText } from "../../../state/ducks/metaData";
import { userLogout } from "../../../state/ducks/authentication/actions";
import lodash from 'lodash';
function Header({layout}){
	const userName = useSelector(state=>state.authentication.userProfile.display_name);
	const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
	const photo = useSelector(state=>state.authentication.userProfile.images);
	const history = useHistory();
	const [text,setText] = useState("");
	const [login,setLogin] = useState(true);
	const handleChange = text => setText(text.target.value);
	const dispatch = useDispatch();
	const {pageName} = useParams();
	console.log(pageName);
	useEffect(()=>{
		dispatch(setSearchText(text));
	},[text]);
	// useEffect(()=>{
	// 	dispatch(userLogout());
	// },[login]);
	return(
		<div className = "header">
			<div className = "header__left">
				<button title = "Go Back" onClick = {()=>history.goBack()}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" fill="currentcolor" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg>
				</button>

				<button title = "Go Forward" onClick = {()=>history.goForward()}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" fill="currentcolor" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
				</button>
                
				{
					layout === "library"&&
                    <div className = "btn__extra">
                    	<Link to = '/collection/playlists'>
                    		<span className = {["btn","bg_btn" && pageName === 'playlists'].join(' ')}>Playlists</span>
                    	</Link>
                    	<Link to = '/collection/artists'>
                    		<span className = {["btn","bg_btn" && pageName === 'artists'].join(' ')}>Artists</span>
                    	</Link>
                    	<Link to = '/collection/albums'>
                    		<span className = {["btn","bg_btn" && pageName === 'albums'].join(' ')}>Albums</span>
                    	</Link>
    
                    </div> 
				}    

				{
					layout === "search" && 
                    <div className = "header__search">
                    	<SearchIcon/>
                    	<input 
                    		placeholder = "Search for songs,artists and podcasts"
                    		type = "text"
                    		onChange = {handleChange}
                    		value = {text}
                    	/> 
                    </div>
				}

			</div>
			
			<div className = "header__right">
				{/* {photo!==undefined?<Avatar src = {photo[0]["url"]} alt = "AP"/>:<Avatar alt = "AP"/>} */}
				<Avatar alt = "AP"/>
				<h4>{userName}</h4>    
				{/* <div class="dropdown">
					<button class="dropbtn" onclick="myFunction()">Dropdown
						<i class="fa fa-caret-down"></i>
					</button>
					<div class="dropdown-content" id="myDropdown">
						<a href="#">Link 1</a>
						<a href="#">Link 2</a>
						<a href="#">Link 3</a>
					</div>
  				</div>  */}

				{/* <div className = "userHolder" onClick = {()=>{setLogin(false);}}>
					<Avatar alt = "AP"/>
					<h4>{userName}</h4>    
					<svg role="img" height="16" width="16" class="Svg-ulyrgf-0 dIsYZz f6406a56d35aea2a3598f6f270ef156c-scss" viewBox="0 0 16 16"><path d="M3 6l5 5.794L13 6z"></path></svg>
				</div> */}
			</div>
		</div>
	);
}

export default Header;