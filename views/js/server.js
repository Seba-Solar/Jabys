const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

// Configura body-parser para manejar datos JSON
app.use(bodyParser.json());

//URL ENCODE PARA LOS PROGRAMAS QUE UTILIZAN FORMULARIOS. 
app.use(express.urlencoded({ extended: true })); // Middleware para parsear los datos del formulario

// Configura el directorio estático para servir archivos (como imágenes)
app.use(express.static(path.join(__dirname, 'jabys')));

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
app.get('/get-data', (req, res) => {
  const query = 'SELECT * FROM producto';
  db.query(query, (err, results) => {
    if (err) {  
      console.error(err);
      res.status(500).send({ message: 'Error al obtener datos' });
      console.log(req.query);
    } else {
      res.send(results);
      
    }
  });
});

// Crea un endpoint para obtener los datos
app.get('/get-data1', (req, res) => {
  const query = 'SELECT * FROM insumo';
  db.query(query, (err, results) => {
    if (err) {  
      console.error(err);
      res.status(500).send({ message: 'Error al obtener datos' });
      console.log(req.query);
    } else {
      res.send(results);
      
    }
  });
});

// ----    ROUTING ---------     //
app.get('/crud-producto' ,(req,res) =>{
  res.sendFile(path.join(__dirname, '../Cruds/CrudProductos.html'));
});

app.get('/crud-insumo',(req, res)=>{
  res.sendFile(path.join(__dirname, '../Cruds/CrudInsumos.html'));
});
//app.get('/')
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
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
