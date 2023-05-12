const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const player = require('play-sound')();
const app = express();
const server = require('http').createServer(app); // Agrega esto
const io = require('socket.io')(server); // Agrega esto

const port = 3000;

// Configuración para poder usar archivos estáticos en la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Manejador para la ruta principal (GET '/')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejador para la ruta de alarma (GET '/alarma')
app.get('/alarma', (req, res) => {
  res.send('¡Alarma sonando!');

  // Emitir un evento a través de WebSocket
  io.emit('sonarAlarma');
});

// Manejador de eventos de WebSocket.
io.on('connection', (socket) => {
  console.log('Un nuevo cliente se ha conectado.');

  // Manejar el evento 'sonarAlarma'
  socket.on('sonarAlarma', () => {
    console.log('Recibido evento para sonar la alarma.');

    // Reproducir la canción en tu ordenador
    player.play(path.join(__dirname, 'alarma1.mp3'), (err) => {
      if (err) throw err;
    });
  });
});

// Inicio del servidor
server.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
