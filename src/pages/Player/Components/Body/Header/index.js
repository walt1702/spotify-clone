import React from 'react';
import './header.css';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from '../../../../../context/DataLayer';
function Header({spotify}){
    const [{user},dispatch] = useDataLayerValue();
    return(
        <div className = "header">
            <div className = "header__left">
                <SearchIcon/>
                <input 
                placeholder = "Search for songs,artists and podcasts"
                type = "text"
                />
            </div>
            <div className = "header__right">
                    <Avatar src = {user?.images[0]?.url} alt = "AP"/>
                <h4>{user?.display_name}</h4>    
            </div>
        </div>
    )
}

export default Header;