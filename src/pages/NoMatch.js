/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";
function NoMatch()
{
	return (
		<div className = "noMatch">
			<div id="logo">
				<Link to = "/home"> 
					<img className = "noMatchImage" src="https://open.scdn.co/cdn/images/spotifylogo.a884cca3.svg"></img>
				</Link>
			</div>
			<div className = "noMatchText">
                Sorry, Couldn't find that
			</div>
		</div>
	);
}

export default NoMatch;