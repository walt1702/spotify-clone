import React from "react";
import "./component.css";

function CardContainer({image,nameItem,id,type,artists,click})
{
	// console.log("hey",nameItem,id,type,artists,image);

	return (
		<div className = "folderCard" onClick = {click}>
			<img src= {image}/>
			<div className = "primary"> 
				<h3>{nameItem}</h3>
			</div>
			{artists&&<div className = "secondary"><p>{artists}</p></div>}
		</div>
	);
}

export default CardContainer;