import { useEffect, useState } from 'react'

let hlss;
function create_hls(i, videoSrc) {
    if (typeof document === "undefined") return;
    console.log(i, videoSrc, hlss)
    // if (hlss[i] !== null) {
    //     console.log("inst", hls, i)
    //     hlss[i].destroy();
    // } else {
    //     //return
    //     //hlss[i] = new Hls();
    // }
    //hlss[i].destroy();

    var video = document.getElementById('video' + i);
    if (Hls.isSupported()) {
        // setTimeout(() => {
        //     hlss[i].loadSource(videoSrc);
        //     hlss[i].attachMedia(video);
        // }, 1000);
        hlss[i] = new Hls();
        //video.src = ""
        hlss[i].loadSource(videoSrc);
        hlss[i].attachMedia(video);

    }
    // HLS.js is not supported on platforms that do not have Media Source
    // Extensions (MSE) enabled.
    //
    // When the browser has built-in HLS support (check using `canPlayType`),
    // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    // element through the `src` property. This is using the built-in support
    // of the plain video element, without using HLS.js.
    //
    // Note: it would be more normal to wait on the 'canplay' event below however
    // on Safari (where you are most likely to find built-in HLS support) the
    // video.src URL must be on the user-driven white-list before a 'canplay'
    // event will be emitted; the last video event that can be reliably
    // listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
    }
}

const Home = () => {
    if (typeof document !== "undefined") { hlss = [null, null, null, null, null, null, null,]; }
    const items = [
        "https://playertest.longtailvideo.com/adaptive/vod-with-mp3/manifest.m3u8",
        "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        "https://playertest.longtailvideo.com/adaptive/aes-with-tracks/master.m3u8",
        "https://test-streams.mux.dev/test_001/stream.m3u8",
        "https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8",
        "https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8",
    ];
    const [main_src, set_main_src] = useState(items[0]);
    var view = true;
    var done = false;
    var beforePlay = true;
    useEffect(() => {
        if (done === false) {
            done = true;
            console.log("init")
            for (var i = 1; i < items.length + 1; i++) {
                document.getElementById("video" + i).addEventListener("click", function () {
                    if (!view) {
                        console.log("video" + (i), "clicked");
                        var menu = document.getElementById("menu");
                        menu.style.opacity = 0;
                        set_main_src(items[i - 1]);
                        setTimeout(function () { view = true; }, 100);

                    }
                });
            }
            document.getElementById("menu").addEventListener("click", function () {
                if (beforePlay) {
                    document.getElementById("music").play();
                    beforePlay = false;
                }
                if (view) {
                    var menu = document.getElementById("menu");
                    menu.style.opacity = 1;
                    view = false;
                    console.log("click")
                }
            }, []);
        }
    }, []);
    useEffect(() => {
        console.log("change 0", main_src)
        if (hlss[0] !== null) { hlss[0].destroy() }
        create_hls(0, main_src);
    }, [main_src])
    return (
        <div>
            <audio src="sample.mp3" id='music'></audio>
            <div className='visual bg-gray-700 z-0'>
                <div id='menu' className='absolute top-0 left-0 z-10 w-full h-fit opacity-0 transition'>
                    <div className='w-full h-screen opacity-90 bg-black z-10 absolute'></div>
                    <div className='z-30 text-white absolute h-fit w-full text-center mt-[7%]'>
                        {items.map((k, idx) => {
                            create_hls(idx + 1, items[idx]);
                            return (
                                <div className='w-[32%] mx-1 inline-block z-40' key={k}>
                                    <video src={k} id={"video" + (idx + 1)} autoPlay muted playsInline></video>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='movie'>
                    <video autoPlay muted playsInline id='video0'></video>
                </div>
            </div>
        </div >
    )
}

export default Home
