document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        password: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar);
    inputPassword.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();

        var emailValue = document.getElementById('email').value;

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Sesión iniciada';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove(); 
            }, 3000);

            // Ejecutar el script de esporas si el correo es 'ellie@tlou.com'
            if (emailValue === 'ellie@tlou.com') {
                console.log('Cargando script de esporas...');
                loadSporesScript();
            }

        }, 3000);
    }

    function spores() {
        // particle density. 100 - 2000
        var density = 200;
    
        // spore cloud starting dimensions
        var cloud_w = 200;
        var cloud_h = 200;
    
        // spore cloud starting position
        var cloud_posX = 0;
        var cloud_posY = 200;
    
        //---------------------
    
        var canvas = document.getElementById('spores');
        var ctx = canvas.getContext('2d');
    
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    
        function particle(x, y, blur) {
            this.x = x;
            this.y = y;
            this.blur = blur;
    
            this.vx = Math.random() * 5 - 1;
            this.vy = Math.random() * 5 - 1;
    
            // Tamaño aleatorio, con algunas partículas más grandes
            var maxSize = 2; // Tamaño máximo de las partículas
            this.size = Math.random() < 0.1 ? Math.random() * (maxSize - 1) + 1 : 1; // 10% de las partículas serán más grandes
        }
    
        var den = (density / 100) * (cloud_w + cloud_h);
    
        var spores = [];
        for (var i = 0; i < den; i++) {
            var x = Math.floor((Math.random() * cloud_w) + cloud_posX);
            var y = Math.floor((Math.random() * cloud_h) + cloud_posY);
    
            var blur = 1;
            spores.push(new particle(x, y, blur));
        }
    
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            for (var k = 0; k < spores.length; k++) {
                var p = spores[k];
    
                ctx.fillStyle = "#22832A";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, true);
                ctx.fill();
    
                //randomly random
                p.x += Math.random() * p.vx;
                p.y += Math.random() * p.vy;
            }
        }
    
        setInterval(draw, 40);
    } // Cierre de la función spores

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'password' && !validarPassword(e.target.value)) {
            mostrarAlerta('La contraseña debe tener al menos 7 caracteres, una mayúscula y un número', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
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
        const resultado = regex.test(email);
        return resultado;
    }

    function validarPassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
        return regex.test(password);
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        email.email = '';
        email.password = '';

        formulario.reset();
        comprobarEmail();
    }

    function loadSporesScript() {
        spores();
    }
});