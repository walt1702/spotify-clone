export const getPlaylistsAndId = (state) =>{
	return state.userCollection.playlists.map(item=>{
		return {
			name:item.name,
			id:item.id
		};
	});
};