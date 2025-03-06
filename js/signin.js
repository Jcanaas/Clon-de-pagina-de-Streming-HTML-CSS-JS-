document.addEventListener('DOMContentLoaded', function() {

    const userData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

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

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

    function enviarFormulario(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Registro exitoso';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            userData[e.target.name] = '';
            comprobarFormulario();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            userData[e.target.name] = '';
            comprobarFormulario();
            return;
        }

        if(e.target.id === 'password' && !validarPassword(e.target.value)) {
            mostrarAlerta('La contraseña debe tener al menos 7 caracteres, una mayúscula y un número', e.target.parentElement);
            userData[e.target.name] = '';
            comprobarFormulario();
            return;
        }

        if(e.target.id === 'confirm-password' && e.target.value !== document.querySelector('#password').value) {
            mostrarAlerta('Las contraseñas no coinciden', e.target.parentElement);
            userData[e.target.name] = '';
            comprobarFormulario();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        userData[e.target.name] = e.target.value.trim();

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
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    function validarPassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
        return regex.test(password);
    }

    function comprobarFormulario() {
        if(Object.values(userData).includes('') || userData.password !== userData.confirmPassword) {
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
});