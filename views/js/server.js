const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

// Configura body-parser para manejar datos JSON
app.use(bodyParser.json());

//URL ENCODE PARA LOS PROGRAMAS QUE UTILIZAN FORMULARIOS. 
app.use(express.urlencoded({ extended: true })); // Middleware para parsear los datos del formulario

// Crea una conexión a la base de datos
let db = mysql.createConnection({
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

// ----    ROUTING ---------     //
app.get('/crud-producto' ,(req,res) =>{
  res.sendFile(path.join(__dirname, '../Cruds/CrudProductos.html'));
});

app.get('/crud-insumos',(req, res)=>{
  res.sendFile(path.join(__dirname, '../Cruds/CrudInsumos.html'));
});

// ----    ROUTING ---------     //

// --------------------- CRUD PRODUCTOS --------------------- //
app.post('/insert', (req, res) => {

  const nombre = req.body.name;
  const precio = req.body.price;
  const cantidad = req.body.quantity;
  const descripcion = req.body.description;
  const alto = req.body.height;
  const ancho = req.body.width;
  const largo = req.body.length;

  const query = `INSERT INTO producto (nombre, precio, cantidad, descripcion, alto, ancho, largo) VALUES ('${nombre}','${precio}', '${cantidad}', '${descripcion}', '${alto}','${ancho}','${largo}')`;



  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al insertar datos' });
    } else {
      res.send({ message: 'Datos insertados con éxito' });
    }
  });
});
// --------------------- CRUD PRODUCTOS --------------------- //



// --------------------- CRUD INSUMOS --------------------- //

app.post('/insert-insumos',(req,res)=>{
  const nombre = req.body.productName;
  const unidad_medida = req.body.productUnidadMedida;
  const cantidad = req.body.productQuantity;

  console.log(req);
  const query = `INSERT INTO insumo (nombre,unidad_medida,cantidad) VALUES ('${nombre}','${unidad_medida}','${cantidad}')`;


  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al insertar datos' });
    } else {
      res.send({ message: 'Datos insertados con éxito' });
    }
  });
});

// --------------------- CRUD INSUMOS --------------------- //
// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
