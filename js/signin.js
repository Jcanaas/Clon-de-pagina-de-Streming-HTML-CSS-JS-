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
            // No podrás procesar la respuesta aquí
            console.log("Solicitud enviada correctamente");
        })
        .catch(error => {
            console.error('Error al registrarse:', error);
            alert("Hubo un error al intentar registrarse.");
        });
    });
});
