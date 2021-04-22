import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

function CommonLayout({layout})
{
	const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
	return (
		<div>
			{
				isUserLoggedIn&&
				<div>
					<Header layout = {layout}/>
					<Sidebar/>
					<Footer/>
				</div>
			}
		</div>
	);
}

export default CommonLayout;