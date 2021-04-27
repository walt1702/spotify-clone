import axios from "axios";
import { useDispatch } from "react-redux";
import { 
	SAVE_DATA_ALBUMS,
	SAVE_DATA_CATEGORIES,
	SAVE_DATA_PLAYLISTS,
	SET_ARTIST_ALBUMS,
	SET_ARTIST_DETAILS,
	SET_ARTIST_TRACKS,
	SET_FOLLOWED_ARTISTS,
	SET_FOLLOWED_TRACKS,
	SET_RELATED_ARTISTS,
	SET_USER_BROWSE_CATEGORIES, 
	SET_USER_BROWSE_FEATURED, 
	SET_USER_BROWSE_LAST_PLAYED, 
	SET_USER_BROWSE_RELEASES, 
	SET_USER_PLAYLISTS, 
	UNFOLLOW_ARTIST,
	UNFOLLOW_PLAYLIST} 
	from "./types";


//Action Creators
export const initUnfollowArtist = id =>{
	return{
		type: UNFOLLOW_ARTIST,
		payload:{
			id
		}
	}
}

export const initUnfollowPlaylist = id =>{
	return{
		type: UNFOLLOW_PLAYLIST,
		payload:{
			id
		}
	}
}

export const setUserPlaylists = playlists =>{
	return {
		type: SET_USER_PLAYLISTS,
		payload:{
			playlists
		}
	};
};

export const setUserBrowseReleases = releases =>{
	return {
		type: SET_USER_BROWSE_RELEASES,
		payload:{
			releases
		}
	};
};

export const setUserBrowseFeatured = featured =>{
	return {
		type: SET_USER_BROWSE_FEATURED,
		payload:{
			featured
		}
	};
};

export const setUserBrowseCategories = categories =>{
	return {
		type: SET_USER_BROWSE_CATEGORIES,
		payload:{
			categories
		}
	};
};

export const saveDataPlaylists = (id,data) =>{
	return{
		type:SAVE_DATA_PLAYLISTS,
		payload:{
			[id]:data
		}
	};
};
export const saveDataAlbums = (id,data) => {
	return {
		type:SAVE_DATA_ALBUMS,
		payload:{
			[id]:data
		}
	};
};
export const saveDataCategories = (id,data) => {
	return {
		type:SAVE_DATA_CATEGORIES,
		payload:{
			[id]:data
		}
	};
};

export const  setUserBrowseLastPlayed = lastPlayed =>{
	return {
		type: SET_USER_BROWSE_LAST_PLAYED,
		payload:{
			lastPlayed
		}
	};
};

export const setArtistDetails = details =>{
	return {
		type:SET_ARTIST_DETAILS,
		payload:{
			details
		}
	};
};

export const setArtistTracks = topTracks =>{
	return {
		type: SET_ARTIST_TRACKS,
		payload:{
			topTracks
		}
	};
};

export const setArtistAlbums = albums =>{
	return {
		type:SET_ARTIST_ALBUMS,
		payload:{
			albums
		}
	};
};

export const setRelatedArtists = relatedArtists =>{
	return {
		type:SET_RELATED_ARTISTS,
		payload:{
			relatedArtists
		}
	};
};

export const setFollowedArtists = artists =>{
	return {
		type : SET_FOLLOWED_ARTISTS,
		payload:{
			artists
		}
	}
}

export const setFollowedTracks = tracks =>{
	return {
		type : SET_FOLLOWED_TRACKS,
		payload:{
			tracks
		}
	}
}


//Fetching stuff
//---------------------------------------------------------------------------------------//


export const fetchUserPlaylists = (accessToken,offset = 0,limit = 10) =>{
	return (dispatch)=>{
		axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,{
			"headers": { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			if(res.data.items.length > 0)
				dispatch(setUserPlaylists(res.data.items));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchUserBrowseReleases = (token,country,offset,limit) =>{
	return (dispatch)=>{
		axios(`https://api.spotify.com/v1/browse/new-releases?country=${country}&offset=${offset}&limit=${limit}`, {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (Response =>   {    
				//console.log("User's Playlist Collection",Response)
				if(Response.data.albums.items.length!==0) 
					dispatch(setUserBrowseReleases(Response.data.albums.items));
			});
	};
};

export const fetchUserBrowseFeatured = (token,country,offset,limit) =>{
	return (dispatch)=>{
		axios(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&offset=${offset}&limit=${limit}`, {
			method: "GET",
			headers: { "Authorization" : "Bearer " + token}
		})
			.then (Response =>   {    
				//console.log("User's Playlist Collection",Response)
				if(Response.data.playlists.items.length!==0) 
					dispatch(setUserBrowseFeatured(Response.data.playlists.items));
			});
	};
};

export const fetchUserBrowseCategories = (token,country,offset,limit) =>{
	return (dispatch)=>{
		axios(`https://api.spotify.com/v1/browse/categories?country=${country}&limit=${limit}&offset=${offset}`,{
			method:"GET",    
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
			//console.log("User's Playlist Collection",Response)
			if(Response.data.categories.items.length!==0) 
				dispatch(setUserBrowseCategories(Response.data.categories.items));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchPlaylistData = (playlistID,accessToken)=>{
	return (dispatch) =>{
		axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`,{
			"headers":{
				"Authorization" : `Bearer ${accessToken}`
			}
		}).then(res=>{
			dispatch(saveDataPlaylists(playlistID,res.data));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchAlbumData = (albumId,accessToken) => {
	return (dispatch)=>{
		axios.get(`https://api.spotify.com/v1/albums/${albumId}`,{
			"headers": { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			dispatch(saveDataAlbums(albumId,res.data));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchCategoryData = (categoryId,country,offset,limit,accessToken) => {
	return (dispatch)=>{
		axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=${country}&offset=${offset}&limit=${limit}`,{
			"headers": { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			dispatch(saveDataCategories(categoryId,res.data));
		}).catch(err=>{
			console.log(err);
		});
	};
};


export const fetchUserBrowseLastPlayed = (token,lastFetchedTrackId = "",limit = 5) =>{
	if(lastFetchedTrackId !== "")
		lastFetchedTrackId = `&after=${lastFetchedTrackId}`;
	return (dispatch)=>{
		axios(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}${lastFetchedTrackId}` ,{
			method:"GET",    
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
			//console.log("User's Playlist Collection",Response)
			if(Response.data.items.length!==0) 
				dispatch(setUserBrowseLastPlayed(Response.data.items));
		}).catch(err=>{
			console.log(err);
		});
	};
};
//https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw
export const fetchArtistDetails = (artistId,accessToken) => {
	return (dispatch)=>{
		axios.get(`https://api.spotify.com/v1/artists/${artistId}`,{
			"headers": { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			dispatch(setArtistDetails(res.data));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchArtistTracks = (artistId,country,accessToken) =>{
	return (dispatch)=>{
		//https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw/top-tracks?market=IN
		axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${country}`,{
			"headers": { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			dispatch(setArtistTracks(res.data));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchArtistAlbums = (artistId,country,limit,offset,accessToken) =>{
	return (dispatch)=>{
		//https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw/albums?market=IN&limit=2&offset=2
		axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?market=${country}&limit=${limit}&offset=${offset}`,{
			"headers": { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			dispatch(setArtistAlbums(res.data));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchRelatedArtists = (artistId,accessToken) =>{
	//https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw/related-artists
	return (dispatch)=>{
		axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`,{
			"headers": { 
				"Authorization": `Bearer ${accessToken}`
			} 
		}).then(res=>{
			dispatch(setRelatedArtists(res.data));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchFollowedArtists = (token,limit = 20,lastFetchedArtistId = '') =>{
	if(lastFetchedArtistId !== "")
		lastFetchedArtistId = `&after=${lastFetchedArtistId}`;
	
	return (dispatch)=>{
		axios(`https://api.spotify.com/v1/me/following?type=artist&limit=${limit}${lastFetchedArtistId}` ,{
			method:"GET",    
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
			//console.log("User's Playlist Collection",Response)
			if(Response.data.artists.items.length > 0) 
				dispatch(setFollowedArtists(Response.data.artists.items));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const fetchFollowedTracks = (token,limit = 20,offset) =>{
	return (dispatch)=>{
		axios(`https://api.spotify.com/v1/me/tracks?market=IN&limit=${limit}&offset=${offset}` ,{
			method:"GET",    
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
			//console.log("User's Playlist Collection",Response)
			if(Response.data.items.length > 0) 
				dispatch(setFollowedTracks(Response.data.items));
		}).catch(err=>{
			console.log(err);
		});
	};
};

export const followArtist = (token,artistId) =>{
	return () =>{
		axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}` ,{
			method:"PUT",    
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
		}).catch(err=>{
			console.log(err);
		});
	};
}


export const unfollowArtist = (token,artistId) =>{
	return () =>{
		axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}` ,{
			method:"DELETE",    
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
			
		}).catch(err=>{
			console.log(err);
		});
	};
}

export const followPlaylist = (token,playlistId) =>{
	return () =>{
		axios(`https://api.spotify.com/v1/playlists/${playlistId}/followers` ,{
			method:"PUT",    
			"public": false,
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
			
		}).catch(err=>{
			console.log(err);
		});
	};
}
export const unfollowPlaylist = (token,playlistId) =>{
	console.log("UnFollwing a playlist");
	return () =>{
		axios(`https://api.spotify.com/v1/playlists/${playlistId}/followers` ,{
			method:"DELETE",   
			headers: { 
				"Authorization": `Bearer ${token}`
			} 
		}).then (Response =>   {    
			
		}).catch(err=>{
			console.log(err);
		});
	};
}