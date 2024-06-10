const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

//Conexion a base de datos
let conexion = mysql.createConnection({
  host: "localhost",
  database: "jabys",
  user: "root",
  password: ""
});

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/administrador-view.html', (req, res) => {
  res.sendFile(__dirname + '/views/administrador-view.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});