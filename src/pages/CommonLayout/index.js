import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function CommonLayout({layout})
{
	return (
		<div>
			<Header layout = {layout}/>
			<Sidebar/>
			<Footer/>
		</div>
	);
}

export default CommonLayout;