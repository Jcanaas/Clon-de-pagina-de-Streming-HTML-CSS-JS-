document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-signin");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario

        // Limpiar mensajes de error previos
        document.querySelectorAll(".error-message").forEach(el => el.remove());

        const usuario = document.getElementById("username").value.trim();
        const contrasena = document.getElementById("password").value.trim();
        const confirmarContrasena = document.getElementById("confirm-password").value.trim();
        const correo = document.getElementById("email").value.trim();

        let hasError = false;

        // Validar que todos los campos estén completos
        if (!usuario) {
            mostrarError("username", "Por favor completa este campo.");
            hasError = true;
        }
        if (!correo) {
            mostrarError("email", "Por favor completa este campo.");
            hasError = true;
        }
        if (!contrasena) {
            mostrarError("password", "Por favor completa este campo.");
            hasError = true;
        }
        if (!confirmarContrasena) {
            mostrarError("confirm-password", "Por favor completa este campo.");
            hasError = true;
        }

        // Validar la contraseña
        const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
        if (contrasena && !contrasenaRegex.test(contrasena)) {
            mostrarError("password", "La contraseña debe tener al menos 7 caracteres, incluir una mayúscula, una minúscula y un número.");
            hasError = true;
        }

        // Validar que las contraseñas coincidan
        if (contrasena && confirmarContrasena && contrasena !== confirmarContrasena) {
            mostrarError("confirm-password", "Las contraseñas no coinciden. Por favor, verifica.");
            hasError = true;
        }

        if (hasError) return; // Detener el envío si hay errores

        const scriptURL = "https://script.google.com/macros/s/AKfycbzsORwapCu088hn1FW4aFLSxJas6lJp0VPK6nwJbWMhsS2T_AoGdiAt9jKXqUGaa6jfaQ/exec"; // URL de tu script de Google Apps

        // Enviar la solicitud POST
        fetch(scriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accion: 'signin',
                usuario: usuario,
                contrasena: contrasena,
                correo: correo,
            }),
            mode: 'no-cors' // Aquí usamos no-cors
        })
        .then(() => {
            console.log("Solicitud enviada correctamente");
        })
        .catch(error => {
            console.error('Error al registrarse:', error);
            alert("Hubo un error al intentar registrarse.");
        });
    });

    // Función para mostrar mensajes de error
    function mostrarError(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = mensaje;
        campo.parentNode.insertBefore(error, campo.nextSibling);
    }
});
