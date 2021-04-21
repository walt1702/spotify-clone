import React from 'react'
import SidebarOption from '../../Container/SidebarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';


import './Sidebar.css'
import { useDataLayerValue } from '../../../../context/DataLayer';

function Sidebar(){

    const [{playlists},dispatch] = useDataLayerValue();
    console.log("Playlists",playlists.items);

    
    return(
        <div className = "sidebar">
            <img className = "sidebar__logo"
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt=""/>

            <SidebarOption title = "Home" Icon = {HomeIcon}/>
            <SidebarOption title = "Search" Icon = {SearchIcon}/>
            <SidebarOption title = "Your library" Icon = {LibraryMusicIcon}/>
            
            <strong className = "sidebar__title">PLAYLISTS</strong>
            <hr/>


            {/* https://stackoverflow.com/questions/46741247/nothing-was-returned-from-render-this-usually-means-a-return-statement-is-missing*/}
            {/*Given that you are using a stateless component as a arrow function the content needs to get in parenthesis "()" instead of brackets "{}" and you have to remove the return function. */}
            
            {playlists?.items?.map(playlist=>(
                <SidebarOption title = {playlist}/>
            ))}

            {/* <SidebarOption title = "TESLA"/> */}
        </div>
    )
}

export default Sidebar;