const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
//Conectar base de datos
let conexion = mysql.createConnection({
  host: "localhost",
  database: "jabys",
  user: "root",
  password: ""
});

conexion.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// Middleware para parsear JSON
app.use(express.json());

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