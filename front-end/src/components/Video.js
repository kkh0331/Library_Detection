import React, {useState} from 'react';
import './MainPage.css';
import VideoPlayer from "./VideoPlayer";

function Video(props) {
    const [ip, setIp] = useState("");
    const {reservations} = props

    const handleClick = () => {
        setIp(document.getElementById('ip-input').value);
    };

    return (
            <div className='video'>
                <div className="video-streaming">
                    <VideoPlayer ip={ip} direction={props.direction}/>
                </div>
                <div className='url'>
                    <p className='url-text'>Input URL</p>
                    <input id='ip-input' className='url-input' type='url'></input>
                    <button className="url-button" onClick={handleClick}>선택</button>
                </div>
            </div>
    )
}

export default Video