import React from "react";
import Sidebar from "./Components/Sidebar";
import Body from "./Components/Body";
import "./Player.css";
import Footer from "./Components/Footer";
function Player({spotify})
{
	//console.log(spotify)
	return(
		<div className = "player">
			<div className = "player__body">
				<Sidebar/>
				<Body spotify = {spotify}/>
			</div>
            
			<Footer/>
		</div>
	);
}

export default Player;