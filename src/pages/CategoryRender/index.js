import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchCategoryData } from '../../state/ducks/userCollection';
import HomePageRow from '../Components/HomePageRow';
import Loading from '../Loading';


function CategoryRender()
{
    const {categoryId} = useParams();
    const dispatch = useDispatch();
    const savedCategories = useSelector(state=>state.userCollection.savedData.categories);
    const token = useSelector(state=>state.authentication.token.access_token);
    useEffect(()=>{
        if(savedCategories[categoryId] === undefined)
            dispatch(fetchCategoryData(categoryId,'IN',0,20,token));
        //console.log("categoryID",categoryId,savedCategories[categoryId]);
    },[categoryId]);
    return (
        <div className = "homePage">
            {
            savedCategories[categoryId] === undefined
                ?
            <Loading/>
                :
            <div  className = "homePage">            
                <HomePageRow title = "playlists" rowName = "Browse all" isTitleLink = {false} items = {savedCategories[categoryId].playlists.items}/>
            </div>
            }
        </div>
    )
}

export default CategoryRender;