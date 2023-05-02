const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Configuración para poder usar archivos estáticos en la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Manejador para la ruta principal (GET '/')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejador para la ruta de alarma (POST '/alarma')
app.post('/alarma', (req, res) => {
  exec('start alarma1.mp3');
  res.send('¡Alarma sonando! ');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
