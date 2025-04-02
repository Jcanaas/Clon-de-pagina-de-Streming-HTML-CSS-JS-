document.addEventListener('DOMContentLoaded', function() {
    const loginData = {
        usuario: '',
        password: ''
    };

    const inputUsuario = document.querySelector('#usuario'); // Campo de usuario
    const inputPassword = document.querySelector('#password'); // Campo de contraseña
    const formulario = document.querySelector('#formulario'); // Formulario
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); // Botón de enviar
    const btnReset = document.querySelector('#formulario button[type="reset"]'); // Botón de reset
    const spinner = document.querySelector('#spinner'); // Spinner de carga

    // Eventos para validar los campos
    inputUsuario.addEventListener('input', validar);
    inputPassword.addEventListener('input', validar);

    // Evento para enviar el formulario
    formulario.addEventListener('submit', enviarLogin);

    // Evento para resetear el formulario
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    });

    function enviarLogin(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        // Datos a enviar al Google Apps Script en formato JSON
        const data = {
            accion: 'login',
            usuario: loginData.usuario,
            contrasena: loginData.password
        };

        console.log('Datos enviados:', data);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzsORwapCu088hn1FW4aFLSxJas6lJp0VPK6nwJbWMhsS2T_AoGdiAt9jKXqUGaa6jfaQ/exec';

        // Enviar datos al Google Apps Script
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data), // Enviar datos como JSON
            headers: {
                'Content-Type': 'text/plain;charset=utf-8' // Encabezado simple para evitar preflight
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json(); // Procesar la respuesta como JSON
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            if (data.success) {
                // Guardar el usuario en Local Storage
                localStorage.setItem("usuario", loginData.usuario);

                mostrarAlertaExito(data.message);

                // Redirigir después de un tiempo (opcional)
                setTimeout(() => {
                    window.location.href = "user.html";
                }, 2000);
            } else {
                mostrarAlertaError(data.message);
            }
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            mostrarAlertaError('Hubo un error al iniciar sesión. Por favor, inténtalo nuevamente.');
        });
    }

    function validar(e) {
        const { id, value, name } = e.target;

        if (value.trim() === '') {
            mostrarAlerta(`El Campo ${id} es obligatorio`, e.target.parentElement);
            loginData[name] = ''; // Limpia el campo correspondiente en loginData
            comprobarFormulario();
            return;
        }

        limpiarAlerta(e.target.parentElement);
        loginData[name] = value.trim(); // Actualiza el valor en loginData
        comprobarFormulario();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function comprobarFormulario() {
        const camposVacios = Object.values(loginData).some(valor => valor.trim() === '');

        if (camposVacios) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        loginData.usuario = '';
        loginData.password = '';

        formulario.reset();
        comprobarFormulario();
    }

    function mostrarAlertaExito(mensaje) {
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        alertaExito.textContent = mensaje;

        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        }, 3000);
    }

    function mostrarAlertaError(mensaje) {
        const alertaError = document.createElement('P');
        alertaError.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        alertaError.textContent = mensaje;

        formulario.appendChild(alertaError);

        setTimeout(() => {
            alertaError.remove();
        }, 3000);
    }
});
