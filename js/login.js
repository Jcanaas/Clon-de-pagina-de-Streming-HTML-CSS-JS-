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

        // Datos a enviar al Google Apps Script
        const data = {
            accion: 'login',
            usuario: loginData.usuario,
            contrasena: loginData.password
        };

        console.log('Datos enviados:', data);

        const scriptURL = 'https://script.google.com/macros/s/AKfycby79hfSqLBKm0AZiGTF3TUi7pSh5bqhg1kA7Nngds-jHVaQNhWkmbgOg4LekfR1hW9ZZQ/exec';

        // Enviar datos al Google Apps Script
        fetch(scriptURL, {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            }
        })
            .then(response => {
                console.log('Estado de la respuesta:', response.status); // Verifica el estado HTTP
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data); // Muestra la respuesta del servidor
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');

                if (data.success) {
                    mostrarAlertaExito('Inicio de sesión exitoso.');
                    resetFormulario();

                    // Redirigir al usuario después de un inicio de sesión exitoso
                    setTimeout(() => {
                        window.location.href = 'dashboard.html'; // Cambia 'dashboard.html' por la página deseada
                    }, 2000);
                } else {
                    mostrarAlertaError(`Error: ${data.message}`);
                }
            })
            .catch(error => {
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');
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
