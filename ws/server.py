import asyncio
import pathlib
import websockets
import json
import datetime
import ssl
import time

users = set()
que = asyncio.Queue()
mes_id = 0
date_send = datetime.datetime.now()

file_history = str(time.time()).split(".")[0]+".txt"
file_path = "history/"+file_history
with open(file_path,mode="w",encoding="utf-8") as f:
	f.write("")

async def send_broadcast():
	global mes_id,date_send,file_path,users
	while True:
		data = await que.get()
		d = date_send
		data = data[:-1]+f',"id":{mes_id},"time":"{("0"+str(d.hour))[-2:]}:{("0"+str(d.minute))[-2:]}"}}'
		j = json.loads(data)
		if j["type"]=="chat" and j["action"]=="message":
			with open(file_path,mode="a",encoding="utf-8") as f:
				f.write(data+"\n")
		j["watching"] = len(users)
		websockets.broadcast(users, json.dumps(j))

def sync(n):
	return json.dumps({
		"type": "sync",
		"name": "server",
		"action": "-",
		"content": "-",
		"watching": n,
	})

# クライアント接続すると呼び出す。
async def accept(websocket, path):
	global users,good,que,mes_id,date_send,file_path
	#await websocket.send("login")

	with open(file_path,mode="r",encoding="utf-8") as f:
		content = f.read().split("\n")

	await websocket.send(json.dumps({
		"type": "connection",
		"name": "server",
		"action": "connect",
		"content": content,
		"watching": len(users)+1,
	}))
	que.put_nowait(sync(len(users)+1))
	try:
		users.add(websocket)
		# 無限ループ
		while True:
			# クライアントからメッセージを待機する。
			data = await websocket.recv()
			mes_id += 1
			date_send = datetime.datetime.now()
			que.put_nowait(data)
			# コンソールに出力
			print("receive : " + data)
			# クライアントでechoを付けて再送信する。
			#await websocket.send(str(good))
	finally:
		users.remove(websocket)
		print(len(users))
		que.put_nowait(sync(len(users)))
 
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain("fullchain1.pem",keyfile="privkey1.pem")
#start_server = websockets.serve(accept, "0.0.0.0", 443, ssl=ssl_context)
start_server = websockets.serve(accept, "0.0.0.0", 9991, ssl=ssl_context)

#start_server = websockets.serve(accept, "0.0.0.0", 9991)

asyncio.ensure_future(send_broadcast())
# 非同期でサーバを待機する。
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
