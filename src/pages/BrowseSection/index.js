import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchUserBrowseCategories, fetchUserBrowseFeatured, fetchUserBrowseReleases } from '../../state/ducks/userCollection';
import HomePageRow from '../Components/HomePageRow';
import Loading from '../Loading';

function BrowseSection()
{
    const {section} = useParams();
    const browse = useSelector(state=>state.userCollection.browse);
    const token = useSelector(state=>state.authentication.token.access_token);
    const dispatch = useDispatch();
    console.log(section);
    let items = []; let load = undefined;
    const loadMoreReleases = () =>{
        dispatch(fetchUserBrowseReleases(token,'IN',browse.releases.length,16));
    }
    const loadMoreFeatured = () =>{
        dispatch(fetchUserBrowseFeatured(token,'IN',browse.featured.length,16));
    }
    const loadMoreCategories = () =>{
        dispatch(fetchUserBrowseCategories(token,'IN',browse.categories.length,16));
    }
    const divref = useRef();
    switch(section)
    {
        case 'newReleases':
            items = browse.releases;
            load = loadMoreReleases;
            break;
        case 'featuredPlaylists':
            items = browse.featured;
            load = loadMoreFeatured;
            break;
        case 'categories':
            items = browse.categories;
            load = loadMoreCategories;
            break;
        default:
            items = undefined;
            load = undefined;
    }
    const [isFetching,setIsFetching] = useState(false);
    useEffect(()=>{
        setIsFetching(false);
    },[items]);
    function handleScoll(){
        if(!isFetching && divref.current.scrollHeight-divref.current.clientHeight-divref.current.scrollTop<40)
        {load();
        setIsFetching(true);}
    }
    return (
        <div className = "homePage" ref = {divref} onScroll = {handleScoll} onLoad = {handleScoll}>
                {/* {isFetching && <div>Loading...</div>} */}
                <HomePageRow title = {section} isTitleLink = {false} items = {items}/>
        </div>
    )
}

export default BrowseSection;