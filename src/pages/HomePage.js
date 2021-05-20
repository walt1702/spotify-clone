/* eslint-disable no-unused-vars */
import React, { useEffect,useRef,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowedArtists, fetchPlaylistData, fetchUserBrowseCategories, fetchUserBrowseFeatured, fetchUserBrowseLastPlayed, fetchUserBrowseReleases, fetchUserPlaylists} from "../state/ducks/userCollection/actions";
import HomePageRow from "./Components/HomePageRow";
import Loading from "./Loading";
import "./pages.css";
import Login from './Login'
function HomePage()
{
	const [loading,setLoading] = useState(false);
	const dispatch = useDispatch();
	//const token = useSelector(state=>state.authentication.token.access_token);
	const token = localStorage.getItem("token");
	const playlists = useSelector(state=>state.userCollection.playlists);
	const browse = useSelector(state=>state.userCollection.browse);
	const lastPlayed = useSelector(state=>state.userCollection.browse.lastPlayed);
	const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
	const followedArtists = useSelector(state=>state.userCollection.following.artists);

	useEffect(()=>{
		if(playlists.length < 5)
			dispatch(fetchUserPlaylists(token,playlists.length));   //Finding out Users playlist
		if(lastPlayed.length < 5)
			dispatch(fetchUserBrowseLastPlayed(token,"",5));
		//else
		// dispatch(fetchUserBrowseLastPlayed(token,lastPlayed[lastPlayed.length-1].id),5);
		if(followedArtists.length<5)
			dispatch(fetchFollowedArtists(token,20,""));
	},[token]);

	useEffect(()=>{
		if(isUserLoggedIn)
		{
			if(browse.releases.length<5)
				dispatch(fetchUserBrowseReleases(token,"IN",browse.releases.length,5));
			if(browse.categories.length<5)
				dispatch(fetchUserBrowseCategories(token,"IN",browse.categories.length,5));
			if(browse.featured.length<5)
				dispatch(fetchUserBrowseFeatured(token,"IN",browse.featured.length,5));    
		}
	},[isUserLoggedIn]);

	return (
		<div>
			{
				!isUserLoggedIn?
				<Login/>
				:
				<div className = "homePage">
				{
					browse.featured === undefined?
					<Loading/>
						:
						<>
							<HomePageRow title = "recentlyPlayed" rowName = "Recently played" items = {browse.lastPlayed.slice(0,4)} isTitleLink = {false}/>
							<HomePageRow title = "newReleases" rowName = "New releases" items = {browse.releases.slice(0,4)}/>
							<HomePageRow title = "featuredPlaylists" rowName = "Featured playlists" items = {browse.featured.slice(0,4)}/>
							<HomePageRow title = "categories" rowName = "Categories" items = {browse.categories.slice(0,4)}/>
						</>
				}
				</div>
			}
		</div>
	);
}

export default HomePage;