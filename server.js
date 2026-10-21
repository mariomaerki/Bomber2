// Minimaler Raum-Relay für Hippie Kaboom. Start: npm install && npm start
const WebSocket = require('ws');
const crypto = require('crypto');
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = Number(process.env.PORT || 8080);
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
});
const wss = new WebSocket.Server({ server: httpServer });
const rooms = new Map();
wss.on('connection', ws => {
  ws.id = crypto.randomBytes(3).toString('hex');
  ws.seat = null;
  ws.isHost = false;
  ws.on('message', raw => {
    let msg; try { msg = JSON.parse(raw.toString()); } catch { return; }
    if (msg.type === 'join') {
      const room = String(msg.room || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
      if (!room) return;
      ws.room = room;
      if (!rooms.has(room)) rooms.set(room, new Set());
      const peers = rooms.get(room);
      ws.isHost = peers.size === 0;
      ws.seat = 'p' + (peers.size + 1);
      peers.add(ws);
      ws.send(JSON.stringify({ type: 'welcome', id: ws.seat, host: ws.isHost }));
      broadcast(room, { type: 'peer', id: ws.seat }, ws);
      return;
    }
    if (!ws.room || !['state', 'input', 'action'].includes(msg.type)) return;
    // The room creator's browser is the game host and publishes state snapshots.
    if (msg.type === 'state' && !ws.isHost) return;
    if (msg.type !== 'state' && ws.isHost) return;
    broadcast(ws.room, msg, ws);
  });
  ws.on('close', () => {
    if (ws.room && rooms.has(ws.room)) {
      rooms.get(ws.room).delete(ws);
      broadcast(ws.room, { type: 'peer-left', id: ws.seat });
      if (!rooms.get(ws.room).size) rooms.delete(ws.room);
    }
  });
});
function broadcast(room, msg, except) {
  const data = JSON.stringify(msg);
  for (const peer of rooms.get(room) || []) if (peer !== except && peer.readyState === WebSocket.OPEN) peer.send(data);
}
httpServer.listen(port, '0.0.0.0', () => console.log(`Hippie Kaboom listening on http://0.0.0.0:${port} (WebSocket on same port)`));







