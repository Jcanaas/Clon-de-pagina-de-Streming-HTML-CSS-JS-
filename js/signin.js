document.addEventListener('DOMContentLoaded', function () {
    const userData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const inputUsername = document.querySelector('#username');
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const inputConfirmPassword = document.querySelector('#confirm-password');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputUsername.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputPassword.addEventListener('input', validar);
    inputConfirmPassword.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarFormulario);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        resetFormulario();
    });

    function enviarFormulario(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        // Datos a enviar al Google Apps Script
        const data = {
            accion: 'registrar',
            correo: userData.email,
            usuario: userData.username,
            contrasena: userData.password
        };

        console.log('Datos enviados:', data);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbxuvhhyEa_vbIygLC2h1D1eLe8u1lyEfFuPx7EQ4pDk1OxOOfuB5MgeYSu-s7HX0SVdMw/exec';

        // Enviar datos al Google Apps Script
        fetch(scriptURL, {
            method: 'POST',
            redirect: 'follow', // Importante para manejar redirecciones
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8' // Cambiar a text/plain
            }
        })
            .then(response => response.json())
            .then(data => {
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');

                if (data.status === "success") {
                    mostrarAlertaExito(data.data);
                    resetFormulario();
                } else {
                    mostrarAlertaError(`Error: ${data.message}`);
                }
            })
            .catch(error => {
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');
                console.error('Error al enviar el formulario:', error);
                mostrarAlertaError('Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente.');
            });
    }

    function validar(e) {
        const { id, value, name } = e.target;

        if (value.trim() === '') {
            mostrarAlerta(`El Campo ${id} es obligatorio`, e.target.parentElement);
            userData[name] = '';
            comprobarFormulario();
            return;
        }

        if (id === 'email' && !validarEmail(value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            userData[name] = '';
            comprobarFormulario();
            return;
        }

        if (id === 'password' && !validarPassword(value)) {
            mostrarAlerta('La contraseña debe tener al menos 7 caracteres, una mayúscula y un número', e.target.parentElement);
            userData[name] = '';
            comprobarFormulario();
            return;
        }

        if (id === 'confirm-password' && value !== document.querySelector('#password').value) {
            mostrarAlerta('Las contraseñas no coinciden', e.target.parentElement);
            userData[name] = '';
            comprobarFormulario();
            return;
        }

        limpiarAlerta(e.target.parentElement);
        userData[name] = value.trim();
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

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    function validarPassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
        return regex.test(password);
    }

    function comprobarFormulario() {
        const camposVacios = Object.values(userData).some(valor => valor.trim() === '');
        const contrasenasNoCoinciden = userData.password !== userData.confirmPassword;

        if (camposVacios || contrasenasNoCoinciden) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        userData.username = '';
        userData.email = '';
        userData.password = '';
        userData.confirmPassword = '';

        formulario.reset();
        comprobarFormulario();
    }
    console.log('Datos enviados:', data); // Verifica los datos en la consola
});
