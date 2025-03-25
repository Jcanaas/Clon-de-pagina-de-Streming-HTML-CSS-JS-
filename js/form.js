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

    // Redirigir a la página de agradecimiento después de 2 segundos
    setTimeout(() => {
        window.location.href = "thank_you.html";
    }, 2000);
}

// Enviar formulario
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();  // Evita el envío predeterminado del formulario

        const nombre = document.getElementById("nomCognoms").value.trim();
        const comentarios = document.getElementById("observacions").value.trim();
        const rating = document.querySelector('input[name="rate"]:checked')?.value;

        console.log("Datos antes de enviar:", { nombre, comentarios, rating });

        // Verifica si los campos obligatorios están completos
        if (!nombre || !rating) {
            const mensaje = document.getElementById("mensaje");
            mensaje.textContent = "Por favor, completa todos los campos obligatorios.";
            mensaje.classList.add("text-red-600");
            return;
        }

        const scriptURL = "https://script.google.com/macros/s/AKfycbzsORwapCu088hn1FW4aFLSxJas6lJp0VPK6nwJbWMhsS2T_AoGdiAt9jKXqUGaa6jfaQ/exec"; // Reemplaza con tu ID de despliegue

        // Construir la URL de la solicitud JSONP
        const url = `${scriptURL}?callback=loadData&nombre=${encodeURIComponent(nombre)}&comentarios=${encodeURIComponent(comentarios)}&rating=${encodeURIComponent(rating)}`;

        // Crear el script para la solicitud JSONP
        const script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
    });
});
