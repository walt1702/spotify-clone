/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Login from "./pages/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./pages/Player";
import {useDataLayerValue} from "./context/DataLayer";
import { SET_DISCOVER_WEEKLY, SET_PLAYING, SET_PLAYLISTS, SET_TOKEN, SET_USER } from "./context/types";
import { Category, RepeatOneSharp } from "@material-ui/icons";

const spotify = new SpotifyWebApi();

function App() {
	const [{user,token},dispatch] = useDataLayerValue();

	useEffect(()=>{
		const hash = getTokenFromUrl();
		window.location.hash = "";
		const _token = hash.access_token;
		if(_token)
		{
			dispatch({
				type:SET_TOKEN,
				token:_token
			});
			spotify.setAccessToken(_token);

			spotify.getMe().then((user)=>{
				dispatch({
					type:SET_USER,
					user:user
				});
			});
		}

		//    https://api.spotify.com/v1/recommendations/available-genre-seeds
		//Getting recommendations - https://api.spotify.com/v1/recommendations

		// axios('https://api.spotify.com/v1/recommendations', {
		//   method: 'GET',
		//   headers: { 'Authorization' : 'Bearer ' + token}
		// })
		// .then (recommendation =>        
		//   console.log("List of all recommendations",recommendation)
		// );

		//Getting available recommended genres
		axios("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (genreResponse =>        
				console.log("Genre",genreResponse)
				// setGenres({
				//   selectedGenre: genres.selectedGenre,
				//   listOfGenresFromAPI: genreResponse.data.categories.items
				// })
			);

		//Getting all the categories
		//    https://api.spotify.com/v1/browse/categories

		axios("https://api.spotify.com/v1/browse/categories?offset=0&limit=30", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (category =>        
				console.log("List of all Category",category)
			);

		//Getting a category that is available in the browser tab
		axios("https://api.spotify.com/v1/browse/categories/equal", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (categoryResponse =>        
				console.log("Category Response by selecting one category",categoryResponse)
			);

		//Getting a category's playlist
		axios("https://api.spotify.com/v1/browse/categories/equal/playlists", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (categoryResponse =>        
				console.log("Category playlist",categoryResponse)
			);

		//Getting all featured playlists in the browswer tab- https://api.spotify.com/v1/browse/featured-playlists
		axios("https://api.spotify.com/v1/browse/featured-playlists", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (categoryResponse =>        
				console.log("Featured playlist",categoryResponse)
			);

		spotify.getUserPlaylists().then(playlists=>{
			dispatch({
				type:SET_PLAYLISTS,
				playlists:playlists
			});
		});

		spotify.getPlaylist("37i9dQZEVXcVOlQQeP9MRP").then(response=>{
			dispatch({
				type:SET_DISCOVER_WEEKLY,
				discover_weekly: response
			});
		});

		//Implementing the search functuanality -  https://api.spotify.com/v1/search?query=tania+bowra&offset=0&limit=20&type=artist
		//Artist
		axios("https://api.spotify.com/v1/search?query=mi&offset=0&limit=20&type=artist", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (categoryResponse =>        
				console.log("Searched Artists",categoryResponse)
			);

		//Track
		axios("https://api.spotify.com/v1/search?query=mi&offset=0&limit=20&type=track", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (categoryResponse =>        
				console.log("Searched Tracks",categoryResponse)
			);


		//Get current playing track;  - https://api.spotify.com/v1/me/player/currently-playing
		axios("https://api.spotify.com/v1/me/player/currently-playing", {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (categoryResponse =>        
				console.log("Current playing track",categoryResponse)
			);


	},[]);
	//  console.log("Retrieved from data Layer-user",user)
	//  console.log("Retrieved from data Layer-token",token)

	return (
		<div className="app">
			{
				token?<Player spotify = {spotify}/>:<Login/> 
			}
		</div>
	);
}

export default App;
