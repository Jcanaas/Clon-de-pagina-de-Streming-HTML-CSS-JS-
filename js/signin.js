function loadData(data) {
    console.log("Respuesta JSONP: ", data);

    const mensaje = document.getElementById("mensaje");
    if (data.mensaje) {
        // Si se recibe la respuesta con éxito
        mensaje.textContent = "¡Formulario enviado con éxito!";
        mensaje.classList.remove("text-red-600");
        mensaje.classList.add("text-green-600");
    } else {
        // Si se recibe un error
        mensaje.textContent = "Hubo un error.";
        mensaje.classList.add("text-red-600");
    }

    // Mostrar los logs en la consola para depuración
    console.log("Logs del servidor:", data.logs);
}

// Enviar formulario
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();  // Evita el envío predeterminado del formulario

        const nombre = document.getElementById("username").value.trim();
        const correo = document.getElementById("email").value.trim();
        const contrasena = document.getElementById("password").value.trim();
        const confirmContrasena = document.getElementById("confirm-password").value.trim();

        if (!nombre || !correo || !contrasena || !confirmContrasena) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const scriptURL = "https://script.google.com/macros/s/AKfycbynARgQU3ziGk24hoOJbMWtEg-N5JFc6QWwOzCPaEMy/dev"; // Reemplaza con tu ID de despliegue

        // Construir la URL de la solicitud JSONP
        const url = `${scriptURL}?callback=loadData&accion=registrar&usuario=${encodeURIComponent(nombre)}&correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`;

        // Crear el script para la solicitud JSONP
        const script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
    });
});
