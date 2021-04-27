import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchFollowedTracks, fetchPlaylistData, followPlaylist, initUnfollowPlaylist, setUserPlaylists, unfollowPlaylist } from '../../state/ducks/userCollection/actions';
import Loading from '../Loading';
import './index.css';
import Songs from './Songs';
import likedTracks from '../../assets/likedTracks.png';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
function PlaylistRender()
{
    const {playlistId} = useParams();
    const dispatch = useDispatch();
    const savedPlaylists = useSelector(state=>state.userCollection.savedData.playlists);
    const followedTracks = useSelector(state=>state.userCollection.following.tracks);
    const token = useSelector(state=>state.authentication.token.access_token);
    let playlistDetails = savedPlaylists[playlistId];
    const user = useSelector(state=>state.authentication.userProfile);
    const [follow,setFollow] = useState(false);
    useEffect(()=>{
        if(playlistId!==undefined && !playlistDetails)
            dispatch(fetchPlaylistData(playlistId,token));
        else
            {
                dispatch(fetchFollowedTracks(token,20,0));
            }
        //https://api.spotify.com/v1/playlists/playlistId/followers/contains?ids=userId
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
                    <button title="Save to Your Library" className="otherbtn" onClick = {handleClick}>
                        {/* <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z" fill="currentColor"></path></svg> */}
                        {follow === true?<FavoriteIcon fontSize = "large"/>:<FavoriteBorderIcon fontSize = "large"/>}
                    </button>
                    <button title="More" className="otherbtn">
                        <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M5.998 13.999A2 2 0 105.999 18 2 2 0 005.998 14zm10.001 0A2 2 0 1016 18 2 2 0 0016 14zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z" fill="currentColor"></path></svg>
                    </button>
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
    )
}

export default PlaylistRender;