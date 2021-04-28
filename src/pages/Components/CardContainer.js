import React, { useEffect, useState } from "react";
import "./component.css";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Link } from "react-router-dom";
function CardContainer({image,nameItem,id,type,artists,click,artistId})
{
	const [show,setShow] = useState(false); 
	return (
		<div className = "folderCard" onClick = {click}>
			<img src= {image}/>
			 {/* <div className = {show?"show":"dont"} onMouseOver = {setShow(true)} onMouseOut = {()=>{setShow(false)}}> */}
			 <div className = "show" style = {{display:"none"}}>
				<PlayCircleOutlineIcon fontSize = "xx-large" fill = "#1db954"/>
			</div> 
			<div className = "primary"> 
				<h3>{nameItem}</h3>
			</div>
			{artists&&<div className = "secondary"><Link to={`/artist/${artistId}`}><p>{artists}</p></Link></div>}
		</div>
	);
}

export default CardContainer;