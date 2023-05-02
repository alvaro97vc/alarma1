const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;
const TOKEN = 'tu_token_secreto';

// Configuración para poder usar archivos estáticos en la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

//https://alvaro97vc.github.io/alarma1
// Manejador para la ruta principal (GET '/')
app.get('/', (req, res) => {
    // Verificar si el token es correcto
    const reqToken = req.query.token;
    if (reqToken === TOKEN) {
      res.sendFile(path.join(__dirname, 'index.html'));
    } else {
      res.status(401).send('Unauthorized');
    }
  });
  


// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});


