(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[154],{1713:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/live",function(){return t(2626)}])},2626:function(e,n,t){"use strict";t.r(n);var l=t(5893),o=(t(3288),t(1163)),i=t(7294),c=t(4298),s=[];function u(e,n){if("undefined"!==typeof document){console.log(e,n,s);var t=document.getElementById("video"+e);Hls.isSupported()?(s[e]=new Hls,s[e].loadSource(n),s[e].attachMedia(t)):t.canPlayType("application/vnd.apple.mpegurl")&&(t.src=n)}}n.default=function(){"undefined"!==typeof document&&(s=[null,null,null,null,null,null,null]);var e=["http://3.224.211.189/live/test.m3u8","http://34.200.222.156/live/test.m3u8"],n=(0,i.useState)(e[0]),t=(n[0],n[1],!0),d=!1,a=!0;(0,i.useEffect)((function(){if(!1===d){var n=function(n){document.getElementById("video"+n).addEventListener("click",(function(){t||(console.log("video"+n,"clicked"),document.getElementById("menu").style.opacity=0,console.log("set main src",e[n-1]),setTimeout((function(){t=!0}),100))}))};d=!0,console.log("init"),"undefined"!==typeof document&&ws_connect("good_button",(function(e){var n=document.getElementById("display"),t=document.createElement("span");"good"==e.data&&(t.innerHTML="\u2764",t.className="display_item",t.style.left=n.clientWidth*Math.random()+"px",n.appendChild(t),setTimeout((function(){t.remove()}),1300))}));for(var l=1;l<e.length+1;l++)n(l);document.getElementById("menu").addEventListener("click",(function(){if(a){document.getElementById("music").play(),a=!1;for(var n=0;n<e.length;n++)u(n+1,e[n])}t&&(document.getElementById("menu").style.opacity=1,t=!1,console.log("click"))}),[])}}),[]);var r=(0,o.useRouter)();return(0,i.useEffect)((function(){var n;console.log("query",r.query.src,r.query),void 0!==r.query.src&&(n=Number(r.query.src),console.log("change 0",n),null!==s[0]&&s[0].destroy(),setTimeout((function(){console.log("change main src",e[n]),u(0,e[n])}),300))}),[r.query]),(0,l.jsxs)("div",{children:[(0,l.jsx)(c.default,{src:"./ws.js",strategy:"beforeInteractive"}),(0,l.jsx)("audio",{src:"sample.mp3",id:"music"}),(0,l.jsxs)("div",{className:"visual bg-gray-700 z-0 overflow-hidden",id:"display",children:[(0,l.jsxs)("div",{id:"menu",className:"absolute top-0 left-0 z-10 w-full h-fit opacity-0 transition",children:[(0,l.jsx)("div",{className:"w-full h-screen opacity-90 bg-black z-10 absolute"}),(0,l.jsx)("div",{className:"z-30 text-white absolute h-fit w-full text-center mt-[7%]",children:e.map((function(e,n){return(0,l.jsx)("div",{className:"w-[32%] mx-1 inline-block z-40",children:(0,l.jsx)("video",{src:e,id:"video"+(n+1),autoPlay:!0,muted:!0,playsInline:!0})},e)}))})]}),(0,l.jsx)("div",{className:"movie",children:(0,l.jsx)("video",{autoPlay:!0,muted:!0,playsInline:!0,id:"video0"})}),(0,l.jsx)("div",{id:"good_button",children:"\u2764"})]})]})}},4298:function(e,n,t){e.exports=t(699)}},function(e){e.O(0,[933,774,888,179],(function(){return n=1713,e(e.s=n);var n}));var n=e.O();_N_E=n}]);