import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import CardContainer from './CardContainer';
import './component.css'
function HomePageRow({title,rowName,description = '',isTitleLink = true,items})
{
    const history = useHistory();
    return (
        <div className = "homePageSection">
            <div className = "introdiv">
                <div>
                    {
                        isTitleLink?
                        <h2>
                            <Link to = {`/browse/${title}`}>
                                <span>
                                {rowName}
                                {/* {title.replace(/([a-z](?=[A-Z]))/g,'$1 ')} */}
                                </span>
                            </Link>
                        </h2>
                        :
                        <h2>
                            {rowName}
                            {/* {title.replace(/([a-z](?=[A-Z]))/g,'$1 ')} */}
                        </h2> 
                    }
                    <p>{description}</p>
                </div>

                <div>
                    {
                        isTitleLink && <Link to = {`/browse/${title}`}><p>See all</p></Link>
                    }
                </div>
            </div>

            <div className = {["cardsContainer",items?.length===5 && "coverFullSpace"].join(' ')}>
                {
                    items?.map(item=>{
                        
                        let imageUrl = '';
                        if(item.type === 'track')
                        imageUrl = item.album?.images[0]?.url;
                        else if(item.type === 'album' || item.type === 'playlist' || item.type === 'artist')
                        imageUrl = item?.images[0]?.url;
                        else if(title === 'categories')
                        imageUrl = item?.icons[0]?.url;
                        else if(title === 'recentlyPlayed')
                        imageUrl = item.track.album.images[0]['url'];
                        
                        let artists = item.artists?item.artists[0].name:undefined;

                        if(title === 'recentlyPlayed')
                        artists = item?.track?.artists[0].name;
                        //Return is important otherwise it won't render
                        
                        return <CardContainer 
                            image = {imageUrl} 
                            nameItem = {item.name?item.name:item.track.name}
                            id = {item.id}
                            type = {item.type?item.type:title}
                            artists = {artists}
                            click = {item.type === 'track'?undefined:()=>{
                                if(item.type)
                                history.push(`/${item.type}/${item.id}`)
                                else
                                history.push(`/categories/${item.id}`)
                            }}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default HomePageRow;