import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";


import "./Sidebar.css";
import { Link } from "react-router-dom";
import { getPlaylistsAndId } from "../../../state/ducks/userCollection/selectors";
import { useSelector } from "react-redux";

function Sidebar(){
	const playlists = useSelector(state=>getPlaylistsAndId(state));

	return(

        
		<div className = "sidebar">
            
			<Link to = '/home'>
				<img className = "sidebar__logo"
					src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
					alt=""/>
			</Link>

			<Link to = '/home'>
				<div className = "sidebarOption">
					<HomeIcon className = "sidebarOption__icon"/>
					<h4>Home</h4>
				</div>
			</Link>            

			<Link to = '/search'>
				<div className = "sidebarOption">
					<SearchIcon className = "sidebarOption__icon"/>
					<h4>Search</h4>
				</div>
			</Link>

			<Link to = '/collection/playlists'>
				<div className = "sidebarOption">
					<LibraryMusicIcon className = "sidebarOption__icon"/>
					<h4>Your library</h4>
				</div>
			</Link>

			<br/>
			<strong className = "sidebar__title">PLAYLISTS</strong>
			<hr/>

			{
				playlists.map(item=>
					<Link to = {`/playlist/${item.id}`}>
						<div className = "sidebarOption">
							<p>{item.name}</p>
						</div>
					</Link>
				)
			}

		</div>
	);
}

export default Sidebar;