import React, { useEffect } from "react";
import "./Footer.css";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import RepeatIcon from "@material-ui/icons/Repeat";
import { useSelector } from 'react-redux';
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
//import { useDataLayerValue } from '../../../../context/DataLayer';

function Footer(){
	let track = useSelector(state => state.metaData?.playingTrack);
	const lastPlayed = useSelector(state => state.userCollection.browse.lastPlayed[0]?.track);
//	console.log(track.album,"track");
	return(
		<div className = "footer">
			{
				track.album===undefined?
				<div className = "footer__left">
					<img className = "footer__albumLogo"
						src = {lastPlayed?.album?.images[0]?.url} alt = ""></img>

					<div className= "footer__songInfo">
						<h5>{lastPlayed?.name}</h5>
						<p>{lastPlayed?.artists[0].name}</p>
					</div>
				</div> :
				<div className = "footer__left">
					<img className = "footer__albumLogo"
						src = {track?.album?.images[0]?.url} alt = ""></img>

					<div className= "footer__songInfo">
						<h5>{track?.name}</h5>
						<p>{track.artists && track?.artists[0].name}</p>
					</div>
				</div>
			}
			
 
			<div className = "footer__center">
				<ShuffleIcon className = "footer__green"/>
				<SkipPreviousIcon className = "footer__icon"/>
				<PlayCircleOutlineIcon fontSize = "large" className = "footer__icon"/>
				<SkipNextIcon className = "footer__icon"/>
				<RepeatIcon className = "footer__green"/>
			</div>

			<div className = "footer__right"> 
				<Grid container spacing={2}>
					<Grid item>
						<PlaylistPlayIcon />
					</Grid>
					<Grid item>
						<VolumeDownIcon />
					</Grid>
					<Grid item xs>
						<Slider aria-labelledby="continuous-slider" />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Footer;