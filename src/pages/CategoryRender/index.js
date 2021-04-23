import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchCategoryData } from '../../state/ducks/userCollection';


function CategoryRender()
{
    const {categoryId} = useParams();
    const dispatch = useDispatch();
    const savedCategories = useSelector(state=>state.userCollection.savedData.categories);
    const token = useSelector(state=>state.authentication.token.access_token);
    useEffect(()=>{
        console.log("categoryID",categoryId);
        if(!savedCategories[categoryId])
            dispatch(fetchCategoryData(categoryId,'IN',0,20,token));
    },[categoryId]);
    return (
        <div>

        </div>
    )
}

export default CategoryRender;