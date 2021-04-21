import { SET_SEARCH_ALBUM, 
	SET_SEARCH_ARTIST, 
	SET_SEARCH_PLAYLIST, 
	SET_SEARCH_TEXT, 
	SET_SEARCH_TRACK } from "./types";
import axios from "axios";

//Action Creators
export const setSearchText = searchText =>{
	return {
		type: SET_SEARCH_TEXT,
		payload:{
			searchText
		}
	};
};

export const setSearchTracks = tracks =>{
	return{
		type:SET_SEARCH_TRACK,
		payload:{
			tracks
		}
	};
};
export const setSearchAlbums = albums =>{
	return{
		type:SET_SEARCH_ALBUM,
		payload:{
			albums
		}
	};
};
export const setSearchPlaylists = playlists =>{
	return{
		type:SET_SEARCH_PLAYLIST,
		payload:{
			playlists
		}
	};
};
export const setSearchArtists = artists =>{
	return{
		type:SET_SEARCH_ARTIST,
		payload:{
			artists
		}
	};
};

export const setSearchItem = (data,typeItem) =>{
	const item = `SET_SEARCH_${typeItem}`;
	console.log(item);
	return{
		type:item,
		payload:{
			typeItem
		}
	};
};
//Fetching Stuff

//https://api.spotify.com/v1/search?q=an&type=track&market=IN&limit=5&offset=0
export const fetchSearch = (accessToken,query,type,offset = 0,limit = 5) =>{
	let tsx = type.toUpperCase();
	console.log(tsx);
	return (dispatch)=>{
		//https://api.spotify.com/v1/search?q=bob%20year:2014&type=album
		axios(`https://api.spotify.com/v1/search?q=${query}&type=${type}&market=IN&limit=${limit}&offset=${offset}`,{
			method:"GET",    
			headers: { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			if(tsx === "TRACK")
				dispatch(setSearchTracks(res.data));
			else if(tsx === "ALBUM")
				dispatch(setSearchAlbums(res.data));
			else if(tsx === "PLAYLIST")
				dispatch(setSearchPlaylists(res.data));
			else if(tsx === "ARTIST")
				dispatch(setSearchArtists(res.data));
			//if(res.data.items.length > 0)
			// dispatch(setSearchItem(res.data,tsx));
		}).catch(err=>{
			console.log(err);
		});
	};
};
