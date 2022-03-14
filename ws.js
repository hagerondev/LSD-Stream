
function ws_connect(button_id, callback) {
    //WebSocket接続
    //var connection = new WebSocket("wss://lsd-com.hageron.com:443/");
    var connection = new WebSocket("wss://lsd-com.hageron.com:9991/");
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
    };

    document.getElementById(button_id).addEventListener("click", function () {
        connection.send("good");
    });
}