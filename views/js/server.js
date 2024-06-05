const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Configura body-parser para manejar datos JSON
app.use(bodyParser.json());

// Crea una conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jabys'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos MySQL.');
  }
});

// Crea un endpoint para obtener los datos
app.get('/datos', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al obtener datos' });
    } else {
      res.send(results);
    }
  });
});

// Crea un endpoint para insertar los datos
app.post('/insert', (req, res) => {
  const data = req.body;
  const query = 'INSERT INTO productos (nombre, precio, cantidad, descripcion, alto, ancho, largo) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [data.nombre, data.precio, data.cantidad, data.descripcion, data.alto, data.ancho, data.largo], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al insertar datos' });
    } else {
      res.send({ message: 'Datos insertados con éxito' });
    }
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
