import React from 'react'
import Header from './Header'
import './Body.css'
import { useDataLayerValue } from '../../../../context/DataLayer'

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from '../../Container/SongRow';

function Body({spotify}){
    const [{discover_weekly},dispatch] = useDataLayerValue();
    //console.log("Discover weekly",discover_weekly);
    return(
        <div className = "body">
            <Header spotify = {spotify}/>

            <div className = "body__info">
                <img src = {discover_weekly?.images[0]?.url} alt = ""/>
                <div className = "body__infoText">
                    <strong>PLAYLIST</strong>
                    <h1>{discover_weekly?.name}</h1>
                    <p>{discover_weekly?.description}</p>
                </div> 
            </div>

            <div className = "body__songs">
                {/* MUI */}
                <div className="body__icons">
                    <PlayCircleFilledIcon
                        className="body__shuffle"
                    />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {/* LISTS OF SONGS */}

                {discover_weekly?.tracks?.items?.map((item)=>(
                    <SongRow track = {item.track}/>
                ))}
            </div>
        </div>
    )
}

export default Body;