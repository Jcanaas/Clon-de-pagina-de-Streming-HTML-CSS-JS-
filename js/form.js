document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario');
    const nombreInput = document.getElementById('nomCognoms');
    const comentariosInput = document.getElementById('observacions');
    const errorNombre = document.getElementById('error-nombre');
    const errorComentarios = document.getElementById('error-comentarios');
    const submitButton = form.querySelector('button[type="submit"]');
    const resetButton = form.querySelector('button[type="reset"]');

    // Restablecer las alertas al cargar la página
    ocultarError(nombreInput, errorNombre);
    ocultarError(comentariosInput, errorComentarios);

    // Función para mostrar el error
    function mostrarError(elemento, mensaje, errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.classList.remove('hidden');
        elemento.classList.add('border-red-500');
    }

    // Función para ocultar el error
    function ocultarError(elemento, errorDiv) {
        errorDiv.classList.add('hidden');
        elemento.classList.remove('border-red-500');
    }

    // Función de validación para el campo Nombre
    function validarNombre() {
        const valor = nombreInput.value.trim();
        if (valor === '') {
            mostrarError(nombreInput, 'El campo Nombre es obligatorio', errorNombre);
            return false;
        } else {
            ocultarError(nombreInput, errorNombre);
            return true;
        }
    }

    // Función de validación para el campo Comentarios
    function validarComentarios() {
        const valor = comentariosInput.value.trim();
        if (valor === '') {
            mostrarError(comentariosInput, 'El campo Comentarios es obligatorio', errorComentarios);
            return false;
        } else {
            ocultarError(comentariosInput, errorComentarios);
            return true;
        }
    }

    // Comprobar si el formulario puede ser enviado (todas las validaciones pasadas)
    function comprobarFormulario() {
        if (validarNombre() && validarComentarios()) {
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-50');
        } else {
            submitButton.disabled = true;
            submitButton.classList.add('opacity-50');
        }
    }

    // Llamar a la función de comprobación al iniciar y al validar
    comprobarFormulario();

    // Eventos focus y blur para los campos de nombre y comentarios
    nombreInput.addEventListener('focus', function () {
        ocultarError(nombreInput, errorNombre); // Cuando el usuario entra, se oculta la alerta
    });

    nombreInput.addEventListener('blur', function () {
        validarNombre(); // Cuando el usuario sale, se valida y se muestra la alerta si está vacío
        comprobarFormulario(); // Revisa si el formulario es válido después de la validación
    });

    comentariosInput.addEventListener('focus', function () {
        ocultarError(comentariosInput, errorComentarios); // Cuando el usuario entra, se oculta la alerta
    });

    comentariosInput.addEventListener('blur', function () {
        validarComentarios(); // Cuando el usuario sale, se valida y se muestra la alerta si está vacío
        comprobarFormulario(); // Revisa si el formulario es válido después de la validación
    });

    // Si se hace reset en el formulario, ocultar los errores también
    resetButton.addEventListener('click', function () {
        ocultarError(nombreInput, errorNombre);
        ocultarError(comentariosInput, errorComentarios);
        comprobarFormulario();
    });

    // Enviar el formulario si es válido
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar que se envíe el formulario antes de la validación
        if (validarNombre() && validarComentarios()) {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxF_mdvSbBRi7FOhpR4YwdbGIeuhgOJniZ7zG_8b_qzM9Y-4HeSUlY-qSoo3aK9WKotyg/exec';
            
            // Obtener los datos del formulario
            const formData = new FormData(form);
            // Enviar los datos a Google Script
            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Verificar la respuesta del servidor
                    if (data.result === 'success') {
                        // Si todo sale bien, redirigir
                        window.location.href = 'thank_you.html';
                    } else {
                        alert("Error: " + data.error);
                    }
                })
                .catch(error => {
                    console.error('Error al enviar el formulario:', error);
                    alert("Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente.");
                });
        }
    });
});
