import {
	SAVE_DATA_ALBUMS,
	SAVE_DATA_PLAYLISTS,
	SET_ARTIST_ALBUMS,
	SET_ARTIST_DETAILS,
	SET_ARTIST_TRACKS,
	SET_FOLLOWED_ARTISTS,
	SET_RELATED_ARTISTS,
	SET_USER_BROWSE_CATEGORIES, 
	SET_USER_BROWSE_FEATURED, 
	SET_USER_BROWSE_LAST_PLAYED, 
	SET_USER_BROWSE_RELEASES,
	SET_USER_PLAYLISTS } 
	from "./types";

const initialState = {
	playlists:[],
	following:{
		artists:[],
	},
	browse:{
		releases:[],
		categories:[],
		featured:[],
		lastPlayed: []
	},
	savedData:{
		playlists:{},
		albums:{},
		categories:{},
	},
	artist:{
		details:{},
		topTracks:{},
		relatedArtists:{},
		albums:{}
	}
};
const userCollectionReducer = (state = initialState,action) =>{
	let oldState = {...state};
	switch(action.type){
	case SET_USER_PLAYLISTS:
		oldState.playlists=[...oldState.playlists, ...action.payload.playlists];
		return oldState;
	case SET_USER_BROWSE_CATEGORIES:
		oldState.browse = {...oldState.browse};
		oldState.browse.categories = [...oldState.browse.categories,...action.payload.categories];
		return oldState;
	case SET_USER_BROWSE_FEATURED:
		oldState.browse = {...oldState.browse};
		oldState.browse.featured = [...oldState.browse.featured,...action.payload.featured];
		return oldState;
	case SET_USER_BROWSE_RELEASES:
		oldState.browse = {...oldState.browse};
		oldState.browse.releases = [...oldState.browse.releases,...action.payload.releases];
		return oldState;
	case SAVE_DATA_PLAYLISTS:
		oldState.savedData = {...oldState.savedData};
		oldState.savedData.playlists = {...oldState.savedData.playlists,...action.payload};
		return oldState;
	case SAVE_DATA_ALBUMS:
		oldState.savedData = {...oldState.savedData};
		oldState.savedData.albums = {...oldState.savedData.albums,...action.payload};
		return oldState;
	case SET_USER_BROWSE_LAST_PLAYED:
		oldState.browse = {...oldState.browse};
		oldState.browse.lastPlayed = [...oldState.browse.lastPlayed,...action.payload.lastPlayed];
		return oldState;
	case SET_ARTIST_DETAILS:
		oldState.artist = {...oldState.artist};
		oldState.artist.details = {...oldState.artist.details,...action.payload.details};
		return oldState;
	case SET_ARTIST_ALBUMS:
		oldState.artist = {...oldState.artist};
		oldState.artist.albums = {...oldState.artist.albums,...action.payload.albums};
		return oldState;
	case SET_ARTIST_TRACKS:
		oldState.artist = {...oldState.artist};
		oldState.artist.topTracks = {...oldState.artist.topTracks,...action.payload.topTracks};
		return oldState;
	case SET_RELATED_ARTISTS:
		oldState.artist = {...oldState.artist};
		oldState.artist.relatedArtists = {...oldState.artist.relatedArtists,...action.payload.relatedArtists};
		return oldState;
	case SET_FOLLOWED_ARTISTS:
		oldState.following = {...oldState.following};
		oldState.following.artists = [...oldState.following.artists,...action.payload.artists];
		return oldState;
	default:
		return oldState;
	}
};

export default userCollectionReducer;
