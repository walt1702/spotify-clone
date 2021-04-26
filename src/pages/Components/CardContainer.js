import React, { useEffect, useState } from "react";
import "./component.css";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
function CardContainer({image,nameItem,id,type,artists,click})
{
	//const [show,setShow] = useState(false); onMouseOver = {()=>{setShow(true)}} onMouseOut = {()=>{setShow(false)}}
	return (
		<div className = "folderCard" onClick = {click}>
			<img src= {image}/>
			{/* <div className = {show?"show":"dont"}>
				<PlayCircleOutlineIcon fontSize = "xx-large" fill = "#1db954"/>
			</div> */}
			<div className = "primary"> 
				<h3>{nameItem}</h3>
			</div>
			{artists&&<div className = "secondary"><p>{artists}</p></div>}
		</div>
	);
}

export default CardContainer;