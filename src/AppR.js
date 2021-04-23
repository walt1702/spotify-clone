/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CommonLayout from "./pages/CommonLayout";
import HomePageRow from "./pages/Components/HomePageRow";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PlaylistRender from "./pages/PlaylistRender";
import "./pages/pages.css";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import AlbumRender from "./pages/AlbumRender";
import ArtistRender from "./pages/ArtistRender";
import CategoryRender from "./pages/CategoryRender";
function App () {
	const playlists = useSelector( state=>state.userCollection.playlists );
	const artists = useSelector(state=>state.userCollection.following.artists);
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path = '/' exact>
						<Login/>
					</Route>
					<Route path = '/home'>
						<CommonLayout/> 
						<HomePage/>
					</Route>

					<Route path = '/home'>
						<CommonLayout/> 
						<HomePage/>
					</Route>
					<Route path = '/search'>
						<CommonLayout layout = "search"/>
						<Search/>
					</Route> 
					<Route path = '/playlist/:playlistId'>
						<CommonLayout/>
						<PlaylistRender/>
					</Route>

					<Route path = '/album/:albumId'>
						<CommonLayout/>
						<AlbumRender/>
					</Route>

					<Route path = '/categories/:categoryId'>
						<CommonLayout/>
						<CategoryRender/>
					</Route>

					<Route path = '/artist/:artistId'>
						< CommonLayout/>
						< ArtistRender/>
					</Route>
					<Route path = '/collection/playlists'>
						<CommonLayout layout = "library"/>
						<div className = "homePage">
							<HomePageRow title = "playlists" items = {playlists} isTitleLink = {false}/>
						</div>
					</Route>
					<Route path = '/collection/artists'>
						<CommonLayout layout = "library"/>
						<div className = "homePage">
							<HomePageRow title = "artists" items = {artists} isTitleLink = {false}/>
						</div>
					</Route>
					<Route path="*">
						<NoMatch />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}
export default App;
