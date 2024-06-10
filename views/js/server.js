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
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/' ,(req,res) =>{
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/crud-insumo',(req, res)=>{
  res.sendFile(path.join(__dirname, '../Cruds/CrudInsumos.html'));
});

app.get('/registro',(req, res)=>{
  res.sendFile(path.join(__dirname, '../auth/registro.html'));
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

// --------------------- Registro --------------------- //

app.post('/register', (req, res) => {
  const nombre = req.body.nombre;
  const contrasena = req.body.contrasena
  const apellidop = req.body.apellidop;
  const apellidom = req.body.apellidom;
  const mail = req.body.correo;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;

  const query = `INSERT into cliente (nombre, contrasena, apellido_p, apellido_m, correo, telefono, direccion) VALUES ('${nombre}','${contrasena}','${apellidop}','${apellidom}','${mail}','${telefono}','${direccion}')`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al insertar datos' });
    } else {
      res.send({ message: 'Datos insertados con éxito' });
    }
  });
});
 
// Cosas Regisstro 
// document.getElementById('registerForm').addEventListener('submit', function(event) {
//   event.preventDefault();

//   const nombre = document.getElementById('nombre').value;
//   const apellidop = document.getElementById('apellidop').value;
//   const apellidom = document.getElementById('apellidom').value;
//   const correo = document.getElementById('correo').value;
//   const telefono = document.getElementById('telefono').value;
//   const direccion = document.getElementById('direccion').value;
//   const errorMessage = document.getElementById('errorMessage');

//   // Limpiar el mensaje de error
//   errorMessage.textContent = '';

//   // Validaciones (opcional)
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(correo)) {
//       errorMessage.textContent = 'El correo electrónico no es válido.';
//       return;
//   }

//   // Enviar los datos al servidor
//   fetch('/register', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ nombre, apellidop, apellidom, correo, telefono, direccion })
//   })
//   .then(response => response.json())
//   .then(data => {
//       errorMessage.textContent = data.message;
//   })
//   .catch(error => {
//       errorMessage.textContent = 'Error al enviar los datos';
//   });
// });





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
