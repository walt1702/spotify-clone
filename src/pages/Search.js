/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
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

    const items = useSelector(state=>state.userCollection.browse.categories);
    
    const load = () =>{
        dispatch(fetchUserBrowseCategories(token,'IN',items.length,16));
    }
    const [isFetching,setIsFetching] = useState(false);
    const divref= useRef();
    useEffect(()=>{
        setIsFetching(false);
    },[items]);
    function handleScroll(){
        if(!isFetching && divref.current.scrollHeight-divref.current.clientHeight-divref.current.scrollTop<40)
        {
            load();
            setIsFetching(true);
        }
    }
    return (
        <div className = "search">
              {
                searchText
                ?
                <div className = "homePage">
                    {searchItem?.tracks && <Songs songs = {searchItem?.tracks?.tracks?.items} rowName = "Popular"/>}
                    {searchItem?.artists && <HomePageRow title = "artists" rowName = "Artists" items = {searchItem?.artists?.artists?.items}/>}
                    {searchItem?.albums && <HomePageRow title = "albums" rowName = "Albums" items = {searchItem?.albums?.albums?.items}/>}
                    {searchItem?.playlists && <HomePageRow title = "playlists" rowName = "Playlists" items = {searchItem?.playlists?.playlists?.items}/>}
                </div>
                :
                <div  className = "homePage" ref = {divref} onScroll = {handleScroll} onLoad = {handleScroll}>            
                    <HomePageRow title = "categories" rowName = "Browse all" isTitleLink = {false} items = {items}/>
                </div>
                
            }  
        </div>
    )
}

export default Search;