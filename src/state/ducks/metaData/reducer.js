import {
	SET_SEARCH_TRACK,
	SET_SEARCH_TEXT,
	SET_SEARCH_ALBUM,
	SET_SEARCH_ARTIST,
	SET_SEARCH_PLAYLIST
}
	from "./types";

const initialState = {
	searchText : "",
	search:{
		tracks:{},
		artists:{},
		albums:{},
		playlists:{}
	}
};
const metaDataReducer = (state=initialState,action) =>{
	let oldState = {...state};
	switch(action.type)    {
	case SET_SEARCH_TEXT:
		return{
			...state,
			searchText:action.payload.searchText
		};
	case SET_SEARCH_TRACK:
		oldState.search = {...oldState.search};
		oldState.search.tracks = {...oldState.search.tracks,...action.payload.tracks};
		return oldState;
	case SET_SEARCH_ALBUM:
		oldState.search = {...oldState.search};
		oldState.search.albums = {...oldState.search.albums,...action.payload.albums};
		return oldState;
	case SET_SEARCH_ARTIST:
		oldState.search = {...oldState.search};
		oldState.search.artists = {...oldState.search.artists,...action.payload.artists};
		return oldState;
	case SET_SEARCH_PLAYLIST:
		oldState.search = {...oldState.search};
		oldState.search.playlists = {...oldState.search.playlists,...action.payload.playlists};
		return oldState;
	default:
		return state;
	}
};

export default metaDataReducer;