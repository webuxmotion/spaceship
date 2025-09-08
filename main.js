const canvas = document.getElementById('app');
const ctx = canvas.getContext('2d');

const ship = new Ship();
ship.rotation = -Math.PI/2;

ship.x = canvas.width / 2;
ship.y = canvas.height / 2;

let vr = 0;
let vx = 0;
let vy = 0;
let thrust = 0;
let gravity = 0.05;

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case "ArrowLeft":
            vr = -0.1;
            break;
        case "ArrowRight":
            vr = 0.1;
            break;
        case "ArrowUp":
            thrust = 0.1;
            ship.showFlame = true;
            break;

        default:
            break;
    }
});

window.addEventListener('keyup', (e) => {
    vr = 0;
    ship.showFlame = false;
    thrust = 0;
});


(function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ship.rotation += vr;
    const angle = ship.rotation;
    const ax = Math.cos(angle) * thrust;
    const ay = Math.sin(angle) * thrust;

    vx += ax;
    vy += ay;
    vy += gravity;
    ship.x += vx;
    ship.y += vy;
    ship.draw(ctx);

    requestAnimationFrame(animate);
})();

