/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearch } from '../state/ducks/metaData';
import { fetchUserBrowseCategories } from '../state/ducks/userCollection/actions';
import Songs from './ArtistRender/Songs';
import HomePageRow from './Components/HomePageRow';
import './pages.css';
function Search()
{
    //fetchSearch = (accessToken,query,type,offset = 0,limit = 5)
    const searchText = useSelector(state=>state.metaData.searchText);
    const token = useSelector(state=>state.authentication.token.access_token);
    const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
    const browse = useSelector(state=>state.userCollection.browse);
    const dispatch = useDispatch();

    const searchItem = useSelector(state=>state.metaData.search);

    useEffect(()=>{
        if(isUserLoggedIn && searchText!==''){
            dispatch(fetchSearch(token,searchText,"artist"));
            dispatch(fetchSearch(token,searchText,"album"));
            dispatch(fetchSearch(token,searchText,"playlist"));
            dispatch(fetchSearch(token,searchText,"track"));         
        }
    },[searchText,isUserLoggedIn,token])


    //Fetching all the categories
    // useEffect(()=>{
    //     if(isUserLoggedIn && searchText === '' && browse.categories.length === 5){
    //         console.log("jskdl");
    //         fetchUserBrowseCategories(token,'IN',0,10);}
    // });
    return (
        <div className = "search">
              {
                searchText
                ?
                <div className = "homePage">
                    <Songs songs = {searchItem?.tracks?.tracks?.items} rowName = "Popular"/>
                    <HomePageRow title = "tracks" rowName = "Songs" items = {searchItem?.tracks?.tracks?.items}/>
                    <HomePageRow title = "artists" rowName = "Artists" items = {searchItem?.artists?.artists?.items}/>
                    <HomePageRow title = "albums" rowName = "Albums" items = {searchItem?.albums?.albums?.items}/>
                    <HomePageRow title = "playlists" rowName = "Playlists" items = {searchItem?.playlists?.playlists?.items}/>
                </div>
                :
                <div  className = "homePage">            
                    <HomePageRow title = "categories" rowName = "Browse all" isTitleLink = {false} items = {browse.categories}/>
                </div>
                
            }  
        </div>
    )
}

export default Search;