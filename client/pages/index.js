import Head from 'next/head'
import { useEffect, useState } from 'react'
import Script from 'next/script'

const Home = () => {
  const [watching, watching_state] = useState(0);
  useEffect(() => {
    console.log("init")
    if (typeof document !== "undefined") {
      const chat_name = localStorage.getItem("chat-name");
      document.getElementById("chat_name").value = chat_name;
      ws_connect("good_button2", "text_button", "chat_name", "chat_content", function (event) {
        // //document.getElementById("dispMsg").value = event.data;
        // const display = document.getElementById("display_iframe");
        // //console.log(display.clientWidth, display.clientHeight, event.data);
        // const heart = document.createElement("span");
        // if (event.data == "good") {
        //   heart.innerHTML = "❤";
        // } else {
        //   return;
        // }
        // heart.className = "display_item";
        // heart.style.left = display.clientWidth * Math.random() + "px";
        // display.appendChild(heart);
        // setTimeout(function () { heart.remove() }, 1300);
        //console.log(event.data)
        const data = JSON.parse(event.data);
        watching_state(data.watching);
        console.log(data)
        if (data.type === "master") {
          if (data.name === "delete" && data.action === "message") {
            var tar_id = data.content;
            document.getElementById("com_" + tar_id).remove();
            var hist = document.getElementById("history");
            hist.scrollTop = hist.scrollHeight;
          }

        } else if (data.type == "connection" && data.action == "connect" && data.name == "server") {
          for (var i = 0; i < data.content.length - 1; i++) {
            var sep_data = JSON.parse(data.content[i])
            if (sep_data.type != "chat" || sep_data.action != "message") continue;
            var box = document.createElement("div");
            box.className = "chat-item";
            var name = document.createElement("div");
            name.className = "chat-name";
            name.innerHTML = sep_data.name;
            var time = document.createElement("div");
            time.className = "chat-time";
            time.innerHTML = sep_data.time;
            var content = document.createElement("div");
            content.className = "chat-content";

            content.innerHTML = sep_data.content;
            box.appendChild(name);
            box.appendChild(time);
            box.appendChild(content);
            box.id = "com_" + String(sep_data.id);
            var hist = document.getElementById("history");
            hist.appendChild(box);

          }
        } else if (data.type == "connection" && data.action == "disconnect") {
          console.log("disconnect someone")
        } else if (data.action == "message" && data.type == "chat") {
          var box = document.createElement("div");
          box.className = "chat-item";
          var name = document.createElement("div");
          name.className = "chat-name";
          name.innerHTML = data.name;
          var time = document.createElement("div");
          time.className = "chat-time";
          time.innerHTML = data.time;
          var content = document.createElement("div");
          content.className = "chat-content";
          content.innerHTML = data.content;
          box.appendChild(name);
          box.appendChild(time);
          box.appendChild(content);
          box.id = "com_" + String(data.id);
          var hist = document.getElementById("history");
          hist.appendChild(box);
          hist.scrollTop = hist.scrollHeight;
        } else if (data.action == "react" && data.type == "chat") {
          //document.getElementById("dispMsg").value = event.data;
          const display = document.getElementById("display_iframe");
          console.log(display.clientWidth, display.clientHeight, event.data);
          const box = document.createElement("span");

          const heart = document.createElement("div");
          if (data.content === "heart") {
            heart.innerHTML = "❤";
          }
          box.appendChild(heart);

          let name_el = document.createElement("div");
          name_el.innerHTML = data.name;
          name_el.className = "chat-react-name";
          box.appendChild(name_el)

          box.className = "display_item";
          box.style.left = display.clientWidth * Math.random() + "px";
          display.appendChild(box);
          setTimeout(function () { box.remove() }, 1300);
          console.log(event.data)
        }
      }, function () {
        var box = document.createElement("div");
        box.className = "chat-item";
        var content = document.createElement("div");
        content.className = "chat-content text-red-600";

        content.innerHTML = "接続が切れました。再読込してください。";
        box.appendChild(content);
        var hist = document.getElementById("history");
        hist.appendChild(box);
        hist.scrollTop = hist.scrollHeight;
      })
    }
  }, []);
  return (
    <div className='font-mono h-screen'>
      <Script
        src="./ws.js"
        strategy="beforeInteractive"
      />
      <div className='bg-white h-[10vh]'>
        <div className='relative mx-12 h-full'>
          <img src='lsd_logo.jpg' className='h-full pr-12 py-2 inline-block'></img>
          <div className='inline-block text-3xl align-middle'>LSD 卒コン</div>

        </div>
      </div>
      <div id='main' className='xl:flex flex-col xl:flex-row p-2 pt-6 xl:p-8 h-[80vh]'>
        <div className='basis-3/4'>
          <div id="display_iframe_wrap" className='relative overflow-hidden mx-auto'>
            <div id='display_iframe' className='xl:w-[97%] mx-auto'>
              <iframe src='hls.html' className='w-full aspect-video mx-auto'></iframe>
            </div>
          </div>
          <div id='detail'>
            <div className='m-8'>
              <div className='my-2 text-xl'>
                視聴中：{watching}人
              </div>
              <div className='my-2'>
                全画面視聴は
                <a className='text-blue-600 hover:border-b cursor-pointer' href="/hls.html">
                  こちら
                </a>から
              </div>
              <div>
                <a className="" href='https://github.com/hagerondev/LSD-Stream'>
                  <div className='text-sm text-blue-600'>この配信の裏側</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id='right' className='basis-1/4 mx-auto w-[97%]'>
          <div id='chat' className='bg-white xl:mr-10 h-full rounded-lg border flex flex-col'>
            <h1 className='p-4 text-2xl font-bold'>コメント</h1>
            <div id='history' className='bg-[#f9f9f9] overflow-scroll flex-1 max-h-80 xl:max-h-full'>
              {/*<div className='chat-item'>
                <div className='chat-name'>name</div>
                <div className='chat-time'>19:35</div>
                <div className='chat-content'>content</div>
              </div>*/}
            </div>
            <div className='bg-white basis-1/5 p-4'>
              <input placeholder='name' type="text" className='border-b text-lg w-full' id="chat_name" /><br />
              <input placeholder='最高！' type="text" className='border-b text-xl my-3 w-full' id="chat_content" />
              <div id='chat-buttons'>
                <button className=' border rounded-md px-8 bg-[#f9f9f9] mx-4 text-xl' id='text_button'>送信</button>
                <button className='text-red-600 border rounded-md px-8 bg-[#f9f9f9] mx-4 text-xl' id='good_button2'>❤</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Home
