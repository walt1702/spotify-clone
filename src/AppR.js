/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import BrowseSection from "./pages/BrowseSection";
import { fetchUserProfile, userLogin } from "./state/ducks/authentication/actions";
import { fetchUserPlaylists } from "./state/ducks/userCollection";
import { fetchUserBrowseLastPlayed } from "./state/ducks/userCollection/actions";
function App () {
	const playlists = useSelector( state=>state.userCollection.playlists );
	const artists = useSelector(state=>state.userCollection.following.artists);
	const albums = useSelector(state=>state.userCollection.following.albums);
    const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
	const _token = localStorage.getItem("token");
	const dispatch = useDispatch();
	useEffect(()=>{
		if(_token!==null){
			dispatch(userLogin(_token));
			dispatch(fetchUserProfile(_token));
//			if(playlists.length === 0)
//				dispatch(fetchUserPlaylists(_token,playlists.length)); 
		}
	},[])
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path = '/' exact>
						{
							_token !== null?
							<div>
								<CommonLayout/> 
								<HomePage/>
							</div>
							:
							<Login/>
						}
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
						<div>
							{
								!isUserLoggedIn?<Login/>:
								<div className = "homePage">
									<HomePageRow title = "playlists" items = {playlists} isTitleLink = {false}/>
								</div>
							}
						</div>
					</Route>
					<Route path = '/collection/artists'>
						<CommonLayout layout = "library"/>
						<div>
							{
								!isUserLoggedIn?<Login/>:
								<div className = "homePage">
									<HomePageRow title = "artists" items = {artists} isTitleLink = {false}/>
								</div>
							}
						</div>
					</Route>
					<Route path = '/collection/albums'>
						<CommonLayout layout = "library"/>
						<div>
							{
								!isUserLoggedIn?<Login/>:
								<div className = "homePage">
									<HomePageRow title = "albums" items = {albums} isTitleLink = {false}/>
								</div>
							}
						</div>
					</Route>
					<Route path = '/collection/tracks'>
						<CommonLayout/>
						<PlaylistRender/>
					</Route>
					<Route path = '/browse/:section'>
						<CommonLayout/>
						<BrowseSection/>
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
