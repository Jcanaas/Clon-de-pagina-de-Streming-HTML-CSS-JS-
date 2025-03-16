console.log('Script de esporas ejecutándose...');

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
});