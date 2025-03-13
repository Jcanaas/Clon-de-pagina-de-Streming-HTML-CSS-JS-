document.addEventListener('DOMContentLoaded', () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxF_mdvSbBRi7FOhpR4YwdbGIeuhgOJniZ7zG_8b_qzM9Y-4HeSUlY-qSoo3aK9WKotyg/exec';
    const form = document.getElementById('formulario');
    const nombreInput = document.getElementById('nomCognoms');
    const comentarioInput = document.getElementById('observacions');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Función para mostrar el mensaje de error
    const showError = (input, mensaje) => {
        // Comprobar si ya existe un mensaje de error antes de agregar uno nuevo
        if (!input.parentElement.querySelector('.bg-red-600')) {
            const error = document.createElement('p');
            error.textContent = mensaje;
            error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
            input.parentElement.appendChild(error);
        }
    };

    // Función para eliminar los mensajes de error
    const clearErrors = () => {
        const errors = document.querySelectorAll('.bg-red-600');
        errors.forEach(error => error.remove());
    };

    // Función para validar los campos del formulario
    const validateForm = () => {
        clearErrors(); // Limpiar los mensajes de error antes de validar
        let valid = true;

        // Validar el campo de nombre
        if (nombreInput.value.trim() === '') {
            showError(nombreInput, 'El campo de Nombre y Apellidos es obligatorio.');
            valid = false;
        }

        // Validar el campo de comentario
        if (comentarioInput.value.trim() === '') {
            showError(comentarioInput, 'El campo de Comentarios es obligatorio.');
            valid = false;
        }

        return valid;
    };

    // Habilitar/deshabilitar el botón de enviar dependiendo de si el formulario es válido
    const toggleSubmitButton = () => {
        if (validateForm()) {
            submitButton.disabled = false;
            submitButton.style.opacity = 1; // Restablecer la opacidad a 100% cuando está habilitado
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = 0.5; // Poner la opacidad al 50% cuando está deshabilitado
        }
    };

    // Verificar la validez de los campos cada vez que el usuario abandona el campo
    nombreInput.addEventListener('blur', toggleSubmitButton);
    comentarioInput.addEventListener('blur', toggleSubmitButton);

    // Asegurarse de que el formulario es válido cuando se envía
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Validar el formulario antes de enviarlo
        if (!validateForm()) {
            return;
        }

        // Obtener la fecha y hora actual
        const fechaHora = new Date().toLocaleString();
        document.getElementById('fechaHora').value = fechaHora;

        // Enviar los datos al script de Google Apps usando fetch
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => response.json()) // Convertir la respuesta en JSON
            .then(data => {
                console.log(data); // Verifica la respuesta del servidor

                // Si la respuesta es exitosa, redirigir al usuario
                if (data.result === 'success') {
                    window.location.href = 'thank_you.html'; // Redirigir a thank_you.html
                }
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
            });
    });

    // Limpiar errores de validación al cargar la página
    clearErrors();

    // Habilitar el botón de enviar al cargar la página si ya están los campos válidos
    toggleSubmitButton();
});
