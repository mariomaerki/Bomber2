# Hippie Kaboom 🌼🐱🚲

Ein kleines Bomberman-inspiriertes Browser-Spiel: Hippies legen Katzenbomben, sprengen Kisten und sammeln Fahrräder für mehr Tempo.

## Lokal spielen
Öffne `index.html` in einem aktuellen Browser. Drücke **Neues Spiel**. Bewegung: Pfeiltasten oder WASD. Leertaste legt eine Katzenbombe. Auf Touch-Geräten erscheinen Richtungstasten und der Katzenknopf.

## Lokal im Netzwerk spielen
1. Starte im Projektordner `npm install` und `npm start`.
2. Andere Geräte im selben WLAN öffnen `http://SERVER-IP:8080`.
3. Alle verbinden sich mit `ws://SERVER-IP:8080` und demselben Raumcode.

## Öffentlich bereitstellen (GitHub Pages + Render)
Dieses Repository enthält eine GitHub-Pages-Aktion für die HTML-Spielseite sowie `render.yaml` für den WebSocket-Spielserver.

1. Lade den Inhalt dieses Ordners in ein GitHub-Repository und stelle unter **Settings → Pages** die Veröffentlichung über **GitHub Actions** ein.
2. Verbinde dasselbe Repository in Render als Blueprint (`render.yaml` liegt im Repository-Root) und erstelle den Web Service. Die Blueprint-Datei wählt den kostenlosen Plan.
3. Nach dem Render-Deploy öffne die GitHub-Pages-Spielseite. In **Serveradresse** trägst du die Render-Adresse mit `wss://` ein, zum Beispiel `wss://hippie-kaboom.onrender.com`. (Auf der Render-Seite selbst wird die Adresse automatisch erkannt.)
4. Teile die GitHub-Pages-Adresse und den Raumcode mit deinen Mitspielenden.

Render Free kann bei Inaktivität schlafen; die erste Verbindung nach einer Pause kann daher etwas länger dauern. Öffentliche Multiplayer-Spiele erfordern, dass der Render-Server erreichbar bleibt.

## Dateien
- `index.html` – Spiel, Darstellung, Tastatur und Touch
- `server.js` – HTTP-Seite und WebSocket-Raum-Relay
- `render.yaml` – Render-Webdienst für den Mehrspieler-Server
- `.github/workflows/pages.yml` – automatische Veröffentlichung der Spielseite auf GitHub Pages
