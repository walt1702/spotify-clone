import React from "react";
import "./SidebarOption.css";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../../../../context/DataLayer";
import { SET_DISCOVER_WEEKLY } from "../../../../context/types";

const spotify = new SpotifyWebApi();

function SidebarOption({title,Icon}){

	const [{user,token},dispatch] = useDataLayerValue();
    
	function changePlaylist(e){
		console.log("Event triggered",e.target,{title});
    
		spotify.getPlaylist(title.id).then(response=>{
			dispatch({
				type:SET_DISCOVER_WEEKLY,
				discover_weekly: response
			});
		});
	}

	return(
		<div className = "sidebarOption">
			{Icon && <Icon className = "sidebarOption__icon"/>}
			{Icon ? <h4>{title}</h4>: <p onClick = {changePlaylist}>{title.name} </p>}
		</div>
	);
}

export default SidebarOption;