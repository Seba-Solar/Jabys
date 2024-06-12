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
app.use

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

//Creamos el endpoint para consumir todos los datos.
app.get('/get-productos',(req,res)=>{
  const query = 'SELECT nombre,precio,descripcion,cantidad,imagen from PRODUCTO';
  db.query(query,(err,results)=>{
    if(err){
      console.error(err);
      res.status(500).send({message: 'Error'});
      console.log(req.query);
    } else{
      res.send(results);
    }
  });
});
// --------    ROUTING ---------     //
app.get('/crud-producto' ,(req,res) =>{
  res.sendFile(path.join(__dirname, 'views/Cruds/CrudProductos.html'));
});
app.get('/crud-proveedor',(req,res)=>{
  res.sendFile(path.join(__dirname,'/views/Cruds/CrudProveedores.html'))
})
app.get('/crud-repuesto',(req,res)=>{
  res.sendFile(path.join(__dirname,'/views/Cruds/CrudRepuestos.html'));
});
app.get('/solicitud',(req,res)=>{
  res.sendFile(path.join(__dirname,'views/Solicitudes.html'))
})
app.get('/' ,(req,res) =>{
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/crud-insumo',(req, res)=>{
  res.sendFile(path.join(__dirname, 'views/Cruds/CrudInsumos.html'));
});

app.get('/registro',(req, res)=>{
  res.sendFile(path.join(__dirname, 'views/auth/registro.html'));
});
app.get('/administrador-view',(req,res)=>{
  res.sendFile(path.join(__dirname, 'views/administrador-view.html'));
});
app.get('/detalle_compra',(req,res) =>{
  res.sendFile(path.join(__dirname,'views/carrito/detalle_compra.html'));
});
app.get('/carrito2',(req,res)=>{
  res.sendFile(path.join(__dirname,'views/carrito/carrito2.html'));
});
app.get('/logins',(req,res)=>{
  res.sendFile(path.join(__dirname, '/views/auth/login.html'));
});
app.get('/formulario-carrito',(req,res)=>{
  res.sendFile(path.join(__dirname,'/views/carrito/formulario-carrito.html'))
});
app.get('/prueba',(req,res)=>{
  res.sendFile(path.join(__dirname,'/views/carrito/prueba.html'));
});
// --------    ROUTING ---------     //

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

// autenticacion login
app.post('/logins', (req, res) => {
  const { nombre, contrasena } = req.body;
  console.log('Datos recibidos:', { nombre, contrasena }); // Log para verificar datos recibidos

  const query = 'SELECT * FROM cliente WHERE nombre = ? AND contrasena = ?';

  db.query(query, [nombre, contrasena], (err, results) => {
      if (err) {
          console.error('Error en la consulta:', err); // Log para verificar errores en la consulta
          res.status(500).json({ success: false, message: 'Error en el servidor' });
      } else if (results.length > 0) {
          console.log('Usuario autenticado con éxito:', results[0]); // Log para verificar autenticación exitosa
          res.json({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
          console.log('Usuario o contraseña incorrectos'); // Log para verificar fallo en autenticación
          res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
      }
  });
});


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

// -------------------- CRUD RESPUESTOS ---------------- //
app.post('/insert-repuesto', (req, res) => {

  const nombre = req.body.name;
  const precio = req.body.price;
  const cantidad = req.body.quantity;
  const descripcion = req.body.description;

  const query = `INSERT INTO repuesto (nombre, precio, cantidad, descripcion) VALUES ('${nombre}','${precio}', '${cantidad}', '${descripcion}')`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al insertar datos' });
    } else {
      res.send({ message: 'Datos insertados con éxito' });
    }
  });
});
// -------------------- CRUD RESPUESTOS ---------------- //
// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});