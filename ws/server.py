import asyncio
import pathlib
import websockets
import json
import datetime
import ssl
import time
import sys

users = set()
que = asyncio.Queue()
date_send = datetime.datetime.now()

if len(sys.argv)==1:
	file_history = str(time.time()).split(".")[0]+".txt"
else:
	file_history = sys.argv[1]

file_path = "history/"+file_history
with open(file_path,mode="a",encoding="utf-8") as f:
	f.write("")

with open(file_path,mode="r",encoding="utf-8") as f:
	mes_id = len(f.read().split("\n"))+50

async def send_broadcast():
	global mes_id,date_send,file_path,users
	while True:
		data = await que.get()
		d = date_send
		data = data[:-1]+f',"id":{mes_id},"time":"{("0"+str(d.hour))[-2:]}:{("0"+str(d.minute))[-2:]}"}}'
		print("send",data)
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

def master(content):
	global del_ids
	master_json = {
		"type": "master",
		"name": "delete",
		"action": "message",
		"content": "-",
	}
	cmd = content["content"]
	arg = cmd.split()
	if arg[0]=="delete":
		try:
			tar_id = int(arg[1])
			del_ids.add(tar_id)
			master_json["content"] = str(tar_id)
			que.put_nowait(json.dumps(master_json))
		finally:
			pass


del_ids = set()
# クライアント接続すると呼び出す。
async def accept(websocket, path):
	global users,good,que,mes_id,date_send,file_path,del_ids
	#await websocket.send("login")

	with open(file_path,mode="r",encoding="utf-8") as f:
		tcontent = f.read().split("\n")

	content = []
	for t in tcontent[:-1]:
		j = json.loads(t)
		if j["id"] not in del_ids:
			content.append(t)
	content.append("")

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
			j = json.loads(data)
			if j["name"]=="hageron_server":
				master(j)
			else:
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
start_server = websockets.serve(accept, "0.0.0.0", 443, ssl=ssl_context)
#start_server = websockets.serve(accept, "0.0.0.0", 9991, ssl=ssl_context)

#start_server = websockets.serve(accept, "0.0.0.0", 9991)

asyncio.ensure_future(send_broadcast())
# 非同期でサーバを待機する。
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
