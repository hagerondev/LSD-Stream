(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3678)}])},3678:function(e,t,n){"use strict";n.r(t);var a=n(5893),l=(n(9008),n(7294)),c=n(4298);t.default=function(){return(0,l.useEffect)((function(){if(console.log("init"),"undefined"!==typeof document){var e=localStorage.getItem("chat-name");document.getElementById("chat_name").value=e,ws_connect("good_button2","text_button","chat_name","chat_content",(function(e){var t=JSON.parse(e.data);if(console.log(t),"connection"==t.type&&"connect"==t.action&&"server"==t.name)for(var n=0;n<t.content.length-1;n++){var a=JSON.parse(t.content[n]);if("chat"==a.type&&"message"==a.action)(l=document.createElement("div")).className="chat-item",(c=document.createElement("div")).className="chat-name",c.innerHTML=a.name,(i=document.createElement("div")).className="chat-time",i.innerHTML=a.time,(s=document.createElement("div")).className="chat-content",s.innerHTML=a.content,l.appendChild(c),l.appendChild(i),l.appendChild(s),(d=document.getElementById("history")).appendChild(l),d.scrollTop=d.scrollHeight}else if("message"==t.action&&"chat"==t.type){var l,c,i,s,d;(l=document.createElement("div")).className="chat-item",(c=document.createElement("div")).className="chat-name",c.innerHTML=t.name,(i=document.createElement("div")).className="chat-time",i.innerHTML=t.time,(s=document.createElement("div")).className="chat-content",s.innerHTML=t.content,l.appendChild(c),l.appendChild(i),l.appendChild(s),(d=document.getElementById("history")).appendChild(l),d.scrollTop=d.scrollHeight}else if("react"==t.action&&"chat"==t.type){var r=document.getElementById("display_iframe");console.log(r.clientWidth,r.clientHeight,e.data);var o=document.createElement("span"),m=document.createElement("div");"heart"===t.content&&(m.innerHTML="\u2764"),o.appendChild(m);var h=document.createElement("div");h.innerHTML=t.name,h.className="chat-react-name",o.appendChild(h),o.className="display_item",o.style.left=r.clientWidth*Math.random()+"px",r.appendChild(o),setTimeout((function(){o.remove()}),1300),console.log(e.data)}}),(function(){var e=document.createElement("div");e.className="chat-item";var t=document.createElement("div");t.className="chat-content text-red-600",t.innerHTML="\u63a5\u7d9a\u304c\u5207\u308c\u307e\u3057\u305f\u3002\u518d\u8aad\u8fbc\u3057\u3066\u304f\u3060\u3055\u3044\u3002",e.appendChild(t);var n=document.getElementById("history");n.appendChild(e),n.scrollTop=n.scrollHeight}))}}),[]),(0,a.jsxs)("div",{className:"font-mono h-screen",children:[(0,a.jsx)(c.default,{src:"./ws.js",strategy:"beforeInteractive"}),(0,a.jsx)("div",{className:"bg-white h-[10vh]",children:(0,a.jsxs)("div",{className:"relative mx-12 h-full",children:[(0,a.jsx)("img",{src:"lsd_logo.jpg",className:"h-full pr-12 py-2 inline-block"}),(0,a.jsx)("div",{className:"inline-block text-3xl align-middle",children:"Multi-angle viewing"}),(0,a.jsx)("a",{className:"absolute right-0 top-5",href:"https://github.com/hagerondev/LSD-Stream",children:(0,a.jsx)("div",{className:"inline-block text-2xl align-middle font-bold border rounded-full border-black aspect-square w-8 text-center bg-gray-100",children:"\uff1f"})})]})}),(0,a.jsxs)("div",{id:"main",className:"flex flex-row p-8 h-[90vh]",children:[(0,a.jsxs)("div",{className:"basis-3/4",children:[(0,a.jsx)("div",{id:"display_iframe_wrap",className:"relative overflow-hidden mx-auto",children:(0,a.jsx)("div",{id:"display_iframe",className:"w-[88%] mx-auto",children:(0,a.jsx)("iframe",{src:"hls.html",className:"w-full aspect-video mx-auto"})})}),(0,a.jsx)("div",{id:"detail",children:(0,a.jsx)("div",{className:"m-8",children:(0,a.jsxs)("div",{className:"my-2",children:["\u5168\u753b\u9762\u8996\u8074\u306f",(0,a.jsx)("a",{className:"text-blue-600 hover:border-b cursor-pointer",href:"/hls.html",children:"\u3053\u3061\u3089"}),"\u304b\u3089"]})})})]}),(0,a.jsx)("div",{id:"right",className:"basis-1/4",children:(0,a.jsxs)("div",{id:"chat",className:"bg-white mr-10 h-full rounded-lg border flex flex-col",children:[(0,a.jsx)("h1",{className:"p-4 text-2xl font-bold",children:"\u30b3\u30e1\u30f3\u30c8"}),(0,a.jsx)("div",{id:"history",className:"bg-[#f9f9f9] overflow-scroll flex-1"}),(0,a.jsxs)("div",{className:"bg-white basis-1/5 p-4",children:[(0,a.jsx)("input",{placeholder:"name",type:"text",className:"border-b text-lg",id:"chat_name"}),(0,a.jsx)("br",{}),(0,a.jsx)("input",{placeholder:"\u6700\u9ad8\uff01",type:"text",className:"border-b text-xl my-3",id:"chat_content"}),(0,a.jsxs)("div",{id:"chat-buttons",children:[(0,a.jsx)("button",{className:" border rounded-md px-8 bg-[#f9f9f9] mx-4 text-xl",id:"text_button",children:"\u9001\u4fe1"}),(0,a.jsx)("button",{className:"text-red-600 border rounded-md px-8 bg-[#f9f9f9] mx-4 text-xl",id:"good_button2",children:"\u2764"})]})]})]})})]})]})}},9008:function(e,t,n){n(5443)},4298:function(e,t,n){e.exports=n(699)}},function(e){e.O(0,[774,888,179],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);