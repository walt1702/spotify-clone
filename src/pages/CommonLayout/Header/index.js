import React, { useEffect, useState } from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchSearchText, setSearchText } from "../../../state/ducks/metaData";

function Header({layout}){
	const userName = useSelector(state=>state.authentication.userProfile.display_name);
	const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
	const photo = useSelector(state=>state.authentication.userProfile.images);
	const history = useHistory();
	const [text,setText] = useState("");
	const handleChange = text => setText(text.target.value);
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(setSearchText(text));
	},[text]);
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
                    		<span className = "btn">Playlists</span>
                    	</Link>
                    	<Link to = '/collection/podcasts'>
                    		<span className = "btn">Podcasts</span>
                    	</Link>
                    	<Link to = '/collection/artists'>
                    		<span className = "btn">Artists</span>
                    	</Link>
                    	<Link to = '/collection/albums'>
                    		<span className = "btn">Albums</span>
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
				 {photo!==undefined?<Avatar src = {photo[0]["url"]} alt = "AP"/>:<Avatar alt = "AP"/>} 
				{/* <Avatar alt = "AP"/> */}
				<h4>{userName}</h4>    
			</div>
		</div>
	);
}

export default Header;