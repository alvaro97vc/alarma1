const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;
const TOKEN = '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';

// Configuración para poder usar archivos estáticos en la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Manejador para la ruta principal (GET '/')
app.get('/', (req, res) => {
    // Obtener el token del header de la petición
    const token = req.headers['authorization'];
    
    // Comprobar si el token es válido
    if (token !== 'TU_TOKEN') {
      return res.status(401).send('Acceso no autorizado');
    }
    
    // Si el token es válido, enviar el archivo HTML
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  

// Manejador para la ruta de alarma (POST '/alarma')
app.post('/alarma', (req, res) => {
  const receivedToken = req.body.token;
  if (receivedToken === TOKEN) {
    res.send('¡Alarma sonando!');
    exec('start alarma1.mp3');
  } else {
    res.status(401).send('Token incorrecto');
  }
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
