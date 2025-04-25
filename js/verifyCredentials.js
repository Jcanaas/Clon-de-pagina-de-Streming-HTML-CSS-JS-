function verifyCredentials() {
    const usuario = localStorage.getItem("usuario");
    const password = localStorage.getItem("password");

    if (usuario && password) {
        const data = {
            accion: 'login',
            usuario: usuario,
            contrasena: password
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzsORwapCu088hn1FW4aFLSxJas6lJp0VPK6nwJbWMhsS2T_AoGdiAt9jKXqUGaa6jfaQ/exec';

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log("Credenciales verificadas correctamente.");
            } else {
                console.log("Credenciales incorrectas. Por favor, inicie sesión nuevamente.");
                localStorage.clear();
                window.location.href = "signin.html";
            }
        })
        .catch(error => {
            console.error("Error al verificar las credenciales:", error);
        });
    } else {
        console.log("No hay credenciales almacenadas. Redirigiendo al inicio de sesión.");
        window.location.href = "../../../../../../../../../../../../../../../../../../../../../../../../../../../../../../../../../login.html";
    }
}
