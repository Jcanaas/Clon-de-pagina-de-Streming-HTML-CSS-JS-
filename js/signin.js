document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-signin");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario

        const usuario = document.getElementById("username").value.trim();
        const contrasena = document.getElementById("password").value.trim();
        const correo = document.getElementById("email").value.trim();

        if (!usuario || !contrasena || !correo) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const scriptURL = "https://script.google.com/macros/s/AKfycbzsORwapCu088hn1FW4aFLSxJas6lJp0VPK6nwJbWMhsS2T_AoGdiAt9jKXqUGaa6jfaQ/exec"; // Reemplaza con tu URL de despliegue

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
            })
        })
        .then(response => response.json())
        .then(data => {
            handleSignInResponse(data); // Maneja la respuesta del servidor
        })
        .catch(error => {
            console.error('Error al registrarse:', error);
            alert("Hubo un error al intentar registrarse.");
        });
    });
});

function handleSignInResponse(data) {
    console.log("Respuesta del servidor:", data);

    const mensaje = document.getElementById("mensaje");
    if (data.success) {
        // Si el registro es exitoso
        mensaje.textContent = "¡Registro exitoso!";
        mensaje.classList.remove("text-red-600");
        mensaje.classList.add("text-green-600");

        // Redirigir al usuario a otra página (opcional)
        setTimeout(() => {
            window.location.href = "/login.html"; // Cambia la URL según tu proyecto
        }, 2000);
    } else {
        // Si hubo un error en el registro
        mensaje.textContent = `Error: ${data.message}`;
        mensaje.classList.add("text-red-600");
    }
}