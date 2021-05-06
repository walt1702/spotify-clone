import React, { useEffect, useRef, useState } from "react";
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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
function Footer(){
	const lastPlayed = useSelector(state => state.userCollection.browse.lastPlayed[0]?.track);
	let track = useSelector(state => state.metaData?.playingTrack);
	if(JSON.stringify(track) === JSON.stringify({}))	{track = lastPlayed;}
	const audioEl = useRef(null);
	const [isPlaying,setIsPlaying] = useState(false);
	const [follow,setFollow] = useState(false);
	useEffect(()=>{
		if(track!==lastPlayed)
		setIsPlaying(true);
	},[track]);
	useEffect(()=>{
		if(isPlaying && track?.preview_url !== null) 
		{
			audioEl.current.play();
		}
		else
		{
			audioEl.current.pause();
		}
	});
	return(
		<div className = "footer">
			
				<div className = "footer__left">
					<img className = "footer__albumLogo"
						src = {track?.album?.images[0]?.url} alt = ""></img>

					<div className= "footer__songInfo">
						<h5>{track?.name}</h5>
						<p>{track?.artists && track?.artists[0].name}</p>
					</div>
					<div className = "footer__like" onClick = {()=>setFollow(!follow)}>
						{follow === true?<div className = "colored"><FavoriteIcon fontSize = "small"/></div>:<FavoriteBorderIcon fontSize = "small"/>}
					</div>
				</div>
			
 
			<div className = "footer__center">
				<audio src = {track?.preview_url} ref = {audioEl}></audio>
				<ShuffleIcon className = "footer__green"/>
				<SkipPreviousIcon className = "footer__icon"/>
				<div onClick = {()=>{setIsPlaying(!isPlaying)}}>{isPlaying && track?.preview_url !== null?<PauseCircleOutlineIcon fontSize = "large" className = "footer__icon"/>:<PlayCircleOutlineIcon fontSize = "large" className = "footer__icon"/>}</div>
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