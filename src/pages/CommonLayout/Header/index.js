import React, { useCallback, useEffect,useState } from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchSearchText, setSearchText } from "../../../state/ducks/metaData";
import { userLogout } from "../../../state/ducks/authentication/actions";
import debounce from "lodash.debounce";
const _ = require("lodash");
function useDebounce(callback, delay) {
	const debouncedFn = useCallback(
	  debounce((...args) => callback(...args), delay),
	  [delay] // will recreate if delay changes
	);
	return debouncedFn;
  }

function useDebounceAlt(callback, delay) {
	const memoizedCallback = useCallback(callback, []);
	const debouncedFn = useRef(debounce(memoizedCallback, delay));
  
	useEffect(() => {
	  debouncedFn.current = debounce(memoizedCallback, delay);
	}, [memoizedCallback, debouncedFn, delay]);
  
	return debouncedFn.current;
}
function Header({layout}){
	const userName = useSelector(state=>state.authentication.userProfile.display_name);
	const isUserLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
	const photo = useSelector(state=>state.authentication.userProfile.images);
	const history = useHistory();
	const [text,setText] = useState("");
	const [low,setLow] = useState(true);
	const [dbValue, saveToDb] = useState(""); 
	const debouncedSave = useDebounce((nextValue) => saveToDb(nextValue), 300);  
	const handleChange = (event) => {
		const { value: nextValue } = event.target;
		setText(nextValue);
		debouncedSave(nextValue);
	  };
	//	const handleChange = text => setText(text.target.value);
	const dispatch = useDispatch();
	const {pageName} = useParams();
//	console.log(pageName);
	useEffect(()=>{
		dispatch(setSearchText(dbValue));
	},[dbValue]);
	return(
		<div className = "header">
			<div className = "header__left">
				<button title = "Go Back" onClick = {()=>history.goBack()}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" fill="currentcolor" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg>
				</button>

				<button title = "Go Forward" onClick = {()=>history.goForward()}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" fill="currentcolor" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
				</button>
                
				{
					layout === "library"&&
                    <div className = "btn__extra">
                    	<Link to = '/collection/playlists'>
                    		<span className = {["btn","bg_btn" && pageName === 'playlists'].join(' ')}>Playlists</span>
                    	</Link>
                    	<Link to = '/collection/artists'>
                    		<span className = {["btn","bg_btn" && pageName === 'artists'].join(' ')}>Artists</span>
                    	</Link>
                    	<Link to = '/collection/albums'>
                    		<span className = {["btn","bg_btn" && pageName === 'albums'].join(' ')}>Albums</span>
                    	</Link>
    
                    </div> 
				}    

				{
					layout === "search" && 
                    <div className = "header__search">
                    	<SearchIcon/>
                    	<input 
                    		placeholder = "Search for songs,artists and podcasts"
                    		type = "text"
                    		onChange = {handleChange}
                    		value = {text}
                    	/> 
                    </div>
				}

			</div>
			
			<div className = "header__right">
				{/* <div class="navigation">
				
					<a class="button" href="">
						<div className = "userHold">
							<Avatar alt = "AP" src = {_.get(photo,'[0].url',undefined)}/>
							<h4>{userName}</h4>
						</div>
						<div class="logout" onClick = {()=>dispatch(userLogout())}>Logout</div>

					</a>

				</div> */}
				<div className = "userHolder" onClick = {()=>{setLow(!low)}}>
					<Avatar alt = "AP" src = {_.get(photo,'[0].url',undefined)}/>
					<h4>{userName}</h4>    
					{	low?<span>▾</span>:<span>▴</span>	}
					{	!low && <div className = "drag" onClick = {()=>dispatch(userLogout())}>Logout</div> }
				</div>
			</div>
		</div>
	);
}

export default Header;