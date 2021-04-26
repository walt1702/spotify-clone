import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchArtistAlbums, fetchArtistDetails, fetchArtistTracks, fetchRelatedArtists } from '../../state/ducks/userCollection/actions';
import Loading from '../Loading';
import Songs from './Songs';
import HomePageRow from '../Components/HomePageRow'

function ArtistRender()
{
    const {artistId} = useParams();
    const dispatch = useDispatch();
    const token = useSelector(state=>state.authentication.token.access_token);
    const artist = useSelector(state=>state.userCollection.artist);
    useEffect(()=>{
        dispatch(fetchArtistDetails(artistId,token));
    },[token,artistId])
    useEffect(()=>{
       // if(artist.topTracks.length<5)
            dispatch(fetchArtistTracks(artistId,'IN',token));
       // if(artist.relatedArtists.length<5)
            dispatch(fetchRelatedArtists(artistId,token));
       // if(artist.albums.length<5)
            dispatch(fetchArtistAlbums(artistId,'IN',5,0,token));
    },[token,artistId])
    //console.log("artist ka tracks",artist.topTracks.tracks.slice(0,5));
    return (
        <div className = "playlistPage">
            {
                artist.albums.items === undefined ? <Loading/> :
                <>
                    <div className = "introdiv">
                        <img src = {artist?.details?.images === undefined?'':artist?.details?.images[0]?.url} alt = ""/>
                        <div className = "body__infoText">
                            <h1 className = "name">{artist.details?.name}</h1>

                            <p className = "extra">
                                <span>{artist?.details?.followers?.total} monthly listeners</span>
                            </p>
                        </div> 
                    </div>

                    <div className="buttonsdiv">
                            <button title="Play" className="play">
                                <svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg>
                            </button>
                            <button title="Save to Your Library" className="otherbtn">
                                <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z" fill="currentColor"></path></svg>
                            </button>
                            <button title="More" className="otherbtn">
                                <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M5.998 13.999A2 2 0 105.999 18 2 2 0 005.998 14zm10.001 0A2 2 0 1016 18 2 2 0 0016 14zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z" fill="currentColor"></path></svg>
                            </button>
                    </div>

                    {artist.topTracks.tracks && <Songs songs = {artist.topTracks.tracks.slice(0,5)} rowName = "Songs"/>}
                    <HomePageRow title = "albums" rowName = "Discography" items = {artist?.albums?.items?.slice(0,4)}/>
                    <HomePageRow title = "artist" rowName = "Fans also like" items = {artist?.relatedArtists?.artists?.slice(0,4)}/>
                </>
            }
        </div>
    )
}

export default ArtistRender;