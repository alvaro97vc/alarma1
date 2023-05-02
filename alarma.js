const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const jwt = require('express-jwt');

const app = express();
const port = 3000;

// Configuración para poder usar archivos estáticos en la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para validar el token
const validarToken = jwt({ secret: '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' });

// Manejador para la ruta principal (GET '/')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  exec('start alarma1.mp3');
});

// Manejador para la ruta de alarma (POST '/alarma')
app.post('/alarma', validarToken, (req, res) => {
  res.send('¡Alarma sonando!');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
