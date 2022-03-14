import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Script from 'next/script'

let hlss = [];
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
    // const items = [
    //     "https://playertest.longtailvideo.com/adaptive/vod-with-mp3/manifest.m3u8",
    //     "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    //     "https://playertest.longtailvideo.com/adaptive/aes-with-tracks/master.m3u8",
    //     "https://test-streams.mux.dev/test_001/stream.m3u8",
    //     "https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8",
    //     "https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8",
    // ];
    const items = [
        "http://3.224.211.189/live/test.m3u8",
        "http://34.200.222.156/live/test.m3u8",
    ]
    const [main_src, set_main_src] = useState(items[0]);
    var view = true;
    var done = false;
    var beforePlay = true;
    useEffect(() => {
        if (done === false) {
            done = true;
            console.log("init")
            if (typeof document !== "undefined") {
                ws_connect("good_button", function (event) {
                    //document.getElementById("dispMsg").value = event.data;
                    const display = document.getElementById("display");
                    //console.log(display.clientWidth, display.clientHeight, event.data);
                    const heart = document.createElement("span");
                    if (event.data == "good") {
                        heart.innerHTML = "❤";
                    } else {
                        return;
                    }
                    heart.className = "display_item";
                    heart.style.left = display.clientWidth * Math.random() + "px";
                    display.appendChild(heart);
                    setTimeout(function () { heart.remove() }, 1300);
                })
            }
            for (var i = 1; i < items.length + 1; i++) {
                document.getElementById("video" + i).addEventListener("click", function () {
                    if (!view) {
                        console.log("video" + (i), "clicked");
                        var menu = document.getElementById("menu");
                        menu.style.opacity = 0;
                        console.log("set main src", items[i - 1]);
                        //set_main_src(items[i - 1]);
                        setTimeout(function () { view = true; }, 100);
                        // for (var i = 1; i < items.length + 1; i++) {
                        //     if (hlss[i] === null) continue;
                        //     hlss[i].destroy();
                        // }

                    }
                });
            }
            document.getElementById("menu").addEventListener("click", function () {
                if (beforePlay) {
                    document.getElementById("music").play();
                    beforePlay = false;
                    for (var i = 0; i < items.length; i++) {
                        create_hls(i + 1, items[i]);
                    }
                }
                if (view) {
                    var menu = document.getElementById("menu");
                    menu.style.opacity = 1;
                    view = false;
                    console.log("click")
                    // for (var i = 0; i < items.length; i++) {
                    //     create_hls(i + 1, items[i]);
                    // }
                }
            }, []);
        }
    }, []);
    const router = useRouter()
    useEffect(() => {
        var idx;
        console.log("query", router.query.src, router.query)
        if (router.query.src === undefined) return
        else idx = Number(router.query.src);
        console.log("change 0", idx)
        if (hlss[0] !== null) { hlss[0].destroy() }
        setTimeout(() => {
            console.log("change main src", items[idx])
            create_hls(0, items[idx]);
        }, 300);
    }, [router.query])
    return (
        <div>
            <Script
                src="./ws.js"
                strategy="beforeInteractive"
            />
            <audio src="sample.mp3" id='music'></audio>
            <div className='visual bg-gray-700 z-0 overflow-hidden' id='display'>
                <div id='menu' className='absolute top-0 left-0 z-10 w-full h-fit opacity-0 transition'>
                    <div className='w-full h-screen opacity-90 bg-black z-10 absolute'></div>
                    <div className='z-30 text-white absolute h-fit w-full text-center mt-[7%]'>
                        {items.map((k, idx) => {
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
                <div id='good_button'>
                    ❤
                </div>
            </div>
        </div >
    )
}

export default Home
