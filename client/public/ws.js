/*
ws message send

data = {
    "type": xxx,
    "name": ---,
    "action": yyy,
    "content": zzz, #optional
}

type: connection
action : [
    connect : 接続,
    disconnect: 接続解除,
]

type: chat
action: [
    react : [
        content : heart (heart以外はいいや)
    ]
    message: [
        conten : zzz (チャット内容)
    ]
]

ws message receive

data = {
    "type": xxx,
    "name": "server",
    "action": yyy,
    "content": zzz, #optional
}

type: connection
action : [
    "watching": [
        "content": [
            k
        ]
    ]
]

type: chat
action : [
    "all": [
        "content": [チャット履歴]
    ]
    "chat": [
        "content": チャット
    ]
    "react":[
        "content": "heart" (heart以外はいいや)
    ]
]

*/

function ws_connect(button_id, text_id, chat_name, chat_content, callback, disconnect) {
    //WebSocket接続
    var connection = new WebSocket("wss://lsd-com.hageron.com:443/");
    //var connection = new WebSocket("wss://lsd-com.hageron.com:9991/");
    console.log("connecting")
    //接続通知
    connection.onopen = function (event) {
        //document.getElementById("eventType").value = "通信接続イベント受信";
        //document.getElementById("dispMsg").value = event.data;
        console.log("connected")
    };

    //エラー発生
    connection.onerror = function (error) {
        console.log(error)
        //document.getElementById("eventType").value = "エラー発生イベント受信";
        //document.getElementById("dispMsg").value = error.data;
        console.log("ERROR", error);
    };

    //メッセージ受信
    connection.onmessage = function (event) {
        //document.getElementById("eventType").value = "メッセージ受信";
        //document.getElementById("dispMsg").value = event.data;
        //console.log(event.data);
        callback(event)
    };

    //切断
    connection.onclose = function () {
        //document.getElementById("eventType").value = "通信切断イベント受信";
        //document.getElementById("dispMsg").value = "";
        disconnect();
    };

    document.getElementById(button_id).addEventListener("click", function () {
        console.log("good action")
        connection.send(JSON.stringify({
            "type": "chat",
            "name": document.getElementById(chat_name).value,
            "action": "react",
            "content": "heart",
        }));

    });
    document.getElementById(text_id).addEventListener("click", function () {
        console.log("message action")
        var content = document.getElementById(chat_content).value;
        if (content.replace(/ /g, '') === "") return;
        document.getElementById(chat_content).value = "";
        var name = document.getElementById(chat_name).value;
        localStorage.setItem("chat-name", name);
        connection.send(JSON.stringify({
            "type": "chat",
            "name": name,
            "action": "message",
            "content": content,
        }));
    });
}