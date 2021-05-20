import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchFollowedTracks, fetchPlaylistData, followPlaylist, initUnfollowPlaylist, setUserPlaylists, unfollowPlaylist } from '../../state/ducks/userCollection/actions';
import Loading from '../Loading';
import './index.css'
import Songs from './Songs';
import likedTracks from '../../assets/likedTracks.png';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import Login from '../Login';
function PlaylistRender()
{
    const {playlistId} = useParams();
    const dispatch = useDispatch();
    const savedPlaylists = useSelector(state=>state.userCollection.savedData.playlists);
    const followedTracks = useSelector(state=>state.userCollection.following.tracks);
    //const token = useSelector(state=>state.authentication.token.access_token);
    const token = localStorage.getItem("token");
    const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
    let playlistDetails = savedPlaylists[playlistId];
    const user = useSelector(state=>state.authentication.userProfile);
    const [follow,setFollow] = useState(false);
    useEffect(()=>{
        if(playlistId!==undefined && !playlistDetails)
            dispatch(fetchPlaylistData(playlistId,token));
        else if(JSON.stringify(followedTracks) === JSON.stringify([]))
            {
//                console.log(followedTracks,"followed tracks");
                dispatch(fetchFollowedTracks(token,50,0));
            }
        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${user.id}`,{
			"headers": { 
				"Authorization": `Bearer ${token}`
			} 
		}).then(res=>{
			setFollow(res?.data[0]);
            console.log(follow,"follow");
		}).catch(err=>{
			console.log(err);
		});
    },[playlistId]);
    const handleClick = () =>{
        if(follow === true)
        {
            setFollow(false);
            dispatch(unfollowPlaylist(token,playlistId));
            dispatch(initUnfollowPlaylist(playlistId));
        }
        else
        {
            setFollow(true);
            dispatch(followPlaylist(token,playlistId));
			dispatch(setUserPlaylists([playlistDetails]));
        }
    }
    if(playlistId === undefined)
    playlistDetails = followedTracks;
    return(
    <div>
        {
            !isUserLoggedIn?
            <Login/>
            :
            <div className = "playlistPage">
            {playlistDetails === undefined?<Loading/>:<>
            <div className = "introdiv">
                <img src = {playlistId!==undefined ? playlistDetails?.images[0]?.url : likedTracks} alt = ""/>
                <div className = "body__infoText">
                    <p className = "boldextra">PLAYLIST</p>
                    <h1 className = "name">{playlistId!==undefined ? playlistDetails?.name : "Liked Songs"}</h1>
                    <p className = "extra">{playlistId!==undefined && playlistDetails?.description}</p>

                    <p className = "extra">
                        <span className = "boldextra">{playlistId!==undefined ? playlistDetails?.owner?.display_name : user.display_name}</span>
                        <span className = "dot">•</span>
                        <span>{playlistId!==undefined && playlistDetails?.followers?.total} likes</span>
                        <span className = "dot">•</span>
                        <span>{playlistId!==undefined ? playlistDetails?.tracks?.total : followedTracks.length} songs</span>
                    </p>
                </div> 
            </div>

            <div className="buttonsdiv">
                    <button title="Play" className="play">
                        <svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg>
                    </button>
                    {playlistId!==undefined && <button title="Save to Your Library" className="otherbtn" onClick = {handleClick}>
                        {follow === true?<div className = "colored"><FavoriteIcon fontSize = "large"/></div>:<FavoriteBorderIcon fontSize = "large"/>}
                    </button>}
                    {playlistId!==undefined && <button title="More" className="otherbtn">
                        <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M5.998 13.999A2 2 0 105.999 18 2 2 0 005.998 14zm10.001 0A2 2 0 1016 18 2 2 0 0016 14zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z" fill="currentColor"></path></svg>
                    </button>}
            </div>

                {/* LISTS OF SONGS */}
{/* 
                {playlistDetails?.tracks?.items?.map((item)=>(
                    // <SongRow track = {item.track}/>
                    console.log(item,"yeah hurray")
                ))} */}

                <Songs songs = {playlistId!==undefined ? playlistDetails?.tracks?.items : followedTracks}/>
                </>
                }
        </div>
        }
    </div>
    )
}

export default PlaylistRender;