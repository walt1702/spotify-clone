/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowedArtists, fetchPlaylistData, fetchUserBrowseCategories, fetchUserBrowseFeatured, fetchUserBrowseLastPlayed, fetchUserBrowseReleases, fetchUserPlaylists} from "../state/ducks/userCollection/actions";
import HomePageRow from "./Components/HomePageRow";
import Loading from "./Loading";
import "./pages.css";
function HomePage()
{
	const [loading,setLoading] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector(state=>state.authentication.token.access_token);
	const playlists = useSelector(state=>state.userCollection.playlists);
	const savedPlaylists = useSelector(state=>state.userCollection.savedData.playlists);
	const browse = useSelector(state=>state.userCollection.browse);
	const lastPlayed = useSelector(state=>state.userCollection.browse.lastPlayed);
	const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
	const followedArtists = useSelector(state=>state.userCollection.following.artists);
    
	useEffect(()=>{
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
			dispatch(fetchFollowedArtists(token));
			if(browse.releases.length<5)
				dispatch(fetchUserBrowseReleases(token,"IN",browse.releases.length,5));
			if(browse.categories.length<5)
				dispatch(fetchUserBrowseCategories(token,"IN",browse.categories.length,5));
			if(browse.featured.length<5)
				dispatch(fetchUserBrowseFeatured(token,"IN",browse.featured.length,5));    
		}
	},[isUserLoggedIn]);

	useEffect(()=>{
		if(isUserLoggedIn)
		{
			playlists.forEach(element => {
				if(!savedPlaylists[element.id])
					dispatch(fetchPlaylistData(element.id,token));
			});
		}
	},[isUserLoggedIn,playlists]);

	return (
		<div className = "homePage">
			{
				browse === undefined
					?<Loading/>
					:
					<>
						<HomePageRow title = "recentlyPlayed" rowName = "Recently played" items = {browse.lastPlayed} isTitleLink = {false}/>
						<HomePageRow title = "newReleases" rowName = "New releases" items = {browse.releases}/>
						<HomePageRow title = "featuredPlaylists" rowName = "Featured playlists" items = {browse.featured}/>
						<HomePageRow title = "categories" rowName = "Categories" items = {browse.categories}/>
					</>
			}
		</div>
	);
}

export default HomePage;