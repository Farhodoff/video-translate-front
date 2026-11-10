# 📡 AI Dub Studio WebSocket Integration Protocol

## Overview
This specification details the bi-directional communication between `video-translate-front` and the dubbing backend pipeline.

### Connection
- **Endpoint:** `ws://<backend_host>/ws/projects/:projectId`
- **Heartbeat:** Client sends `{ "type": "ping", "ts": number }` every 15 seconds. Backend responds with `{ "type": "pong" }`.

### Server Message Types
1. **`stage_update`**:
   ```json
   {
     "type": "stage_update",
     "stage": "transcribing" | "translating" | "synthesizing",
     "progress": 45
   }
   ```
2. **`segments_ready`**:
   ```json
   {
     "type": "segments_ready",
     "segments": [
       { "id": 1, "start": 0.0, "end": 4.5, "text": "Translated sentence" }
     ]
   }
   ```
3. **`complete`**:
   ```json
   {
     "type": "complete",
     "dubbedVideoUrl": "https://cdn.example.com/dubbed.mp4"
   }
   ```
