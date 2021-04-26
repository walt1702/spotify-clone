import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPlayingTrack } from '../../state/ducks/metaData/actions';
import './index.css'
function Songs({songs,rowName})
{
    const headerRef = useRef(null);
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const checkHeaderSticky = () =>{
        let limit = (window.screen.height/10)+1;
        headerRef.current.parentElement.classList.toggle("sticked",headerRef.current.getBoundingClientRect().y <= limit);
        
    }
    let par=undefined;
    useEffect(() => {
        containerRef.current.parentElement.addEventListener('scroll',checkHeaderSticky);
        par=containerRef.current.parentElement;
        return () => {
            par.removeEventListener('scroll',checkHeaderSticky);
        }
    }, [containerRef])


    const pad = num =>{
        let s = num.toString();
        while(s.length < 2)
            s="0"+s;
        return s;
    }

    return (
        <div className = "tableContainer" ref = {containerRef}>
            <table className = "table">
                <colgroup>
                    <col style={{width:"5%"}}/>
                    <col style={{width:"50%"}}/>
                    <col style={{width:"8%"}}/>
                </colgroup>

                 {/* <thead>
                    <tr>
                        <th ref={headerRef}>#</th>
                        <th>Title</th>
                        <th>album</th>
                        <th>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor"></path></svg>
                        </th>
                    </tr>
                </thead>  */}

                <h2 ref = {headerRef}>{rowName}</h2>

                <tbody>
                    {
                        songs?.map(song=><tr onClick = {()=>
                            {
                                //console.log("playing track",song);
                                dispatch(setPlayingTrack(song));
                            }
                        }>
                            <td></td>
                            <td>
                                <div className="titlediv">
                                    <img src={song.album.images[0].url} width="40px" height="40px" draggable="false" alt=""/>
                                    <div>
                                        <span className="highlighted">{song.name}</span>
                                    </div>
                                </div>
                            </td>
                            {/* <td><Link to={`/album/${song.album.id}`}><span>{song.album.name}</span></Link></td> */}
                            <td>{`${Math.trunc(Math.ceil(song.duration_ms/1000)/60)}:${pad(Math.ceil(song.duration_ms/1000)%60)}`}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Songs;