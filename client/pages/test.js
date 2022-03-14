import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

let hls;

const Home = () => {
    const item = "http://3.133.107.189/live/test.m3u8";

    useEffect(() => {
        console.log("useeffect")
        setTimeout(function () {
            //var hls = new Hls();
            hls = new Hls();
            var video = document.getElementById("video");
            hls.loadSource(item);
            hls.attachMedia(video);
        }, 1000)

    }, []);

    return (
        <div>aaaaa
            <video id='video' controls>

            </video>
        </div >
    )
}

export default Home
