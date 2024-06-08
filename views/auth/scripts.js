document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellidop = document.getElementById('apellidop').value;
    const apellidom = document.getElementById('apellidom').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const errorMessage = document.getElementById('errorMessage');

    // Limpiar el mensaje de error
    errorMessage.textContent = '';

    // Validaciones (opcional)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correo)) {
        errorMessage.textContent = 'El correo electrónico no es válido.';
        return;
    }

    // Enviar los datos al servidor
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellidop, apellidom, correo, telefono, direccion })
    })
    .then(response => response.json())
    .then(data => {
        errorMessage.textContent = data.message;
    })
    .catch(error => {
        errorMessage.textContent = 'Error al enviar los datos';
    });
});
