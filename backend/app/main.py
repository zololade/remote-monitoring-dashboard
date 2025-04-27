"""fast api by ai"""

import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from utils import fetcher

app = FastAPI()


# WebSocket endpoint to handle incoming messages
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """unset"""
    await websocket.accept()

    try:
        while True:
            res = fetcher.main()
            await websocket.send_text(res)
            await asyncio.sleep(20)

    except WebSocketDisconnect:
        print("Client disconnected")
