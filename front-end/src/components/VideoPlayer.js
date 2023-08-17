import React, {useEffect, useState} from 'react';
import html2canvas from "html2canvas";
import axios from "axios";
import DummyShow from "./DummyShow";

function VideoPlayer({ip, direction}) {

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentCount, setCurrentCount] = useState(0); //확인용
    const [imageUrl, setImageUrl] = useState('');

    const videoId = `${direction}VideoId`

    const handlePause = () => {
        setIsPlaying(false);
    }

    const handlePlay = () => {
        setIsPlaying(true);
    }
    // ip 주소
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if(ip !== "") {
    //             fetchImage().then(dataUrl => {
    //                 setImageUrl(dataUrl)
    //                 sendImageToServer(dataUrl)
    //             });
    //         }
    //     }, 5000);
    //
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [ip]);

    // local video
    useEffect(() => {

        const interval = setInterval(() => {
            if (isPlaying) {
                // setCurrentCount(currentCount + 1); // 확인용
                sendCurrentScreenShotToServer();
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying]);

    const fetchImage = async () => {
        try{
            const response = await fetch(`${ip}/shot.jpg`)
            if(response.ok) {
                const blob = await response.blob();
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
            } else {
                console.log('Failed to fetch image: ', response.status);
            }
        } catch(error){
            console.error('Error fetching image: ',error);
        }
    }


    const sendCurrentScreenShotToServer = async () => {
        try {
            const canvas = await html2canvas(document.getElementById(videoId), {
                backgroundColor: '#342D2D',
                allowTaint: true,
                useCORS: true
            });

            const c_url = canvas.toDataURL("image/jpeg");
            setImageUrl(c_url)

            await sendImageToServer(c_url)

        } catch (e) {
            console.log("sendCurrentScreenShotToServer ", e);
        }
    };

    const sendImageToServer = async (imageData) => {
        const formData = new FormData();
        formData.append("data", imageData)
        formData.append("direction", direction)

        await axios.post('http://127.0.0.1:8000/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log("sendImageToServer ", error)
        })
    }

    return (
        <div>
            {/* local video 경우*/}
            <video id={videoId}
                   src={direction==='back' ? '/testBack.mp4' : '/testFront.mp4'}
                   // src='/testBack.mp4'
                   loop muted controls autoPlay
                   width="480"
                   height="270"
                   // width="1104"
                   // height="1080"
                   onPause={handlePause}
                   onPlay={handlePlay}
            />
            {/* ip 주소 경우 */}
            {/*<img id={videoId} src ={`${ip}/video`} width= '560' height='360' alt="수업 중이 아닙니다."></img>*/}

            {/* <p>CurrentCount : {currentCount}</p>
            <img src={imageUrl} width='560' height="360"/> */}
            {/* <div><DummyShow reservations={props.reservations}/></div> */}
        </div>
    )

}

export default VideoPlayer;