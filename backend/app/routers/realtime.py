from fastapi import APIRouter, WebSocket
from app.realtime.manager import manager

router = APIRouter()


@router.websocket("/ws")
async def websocket(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            await ws.receive_text()
    finally:
        manager.disconnect(ws)