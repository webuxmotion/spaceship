const canvas = document.getElementById('app');
const ctx = canvas.getContext('2d');
const ground = new Ground(ctx);
const gamepad = new Gamepad();

const ship = new Ship();
ship.rotation = -Math.PI/2;

ship.x = canvas.width / 2;
ship.y = 20;

let vr = 0;
let vx = 0;
let vy = 0;
let thrust = 0;
let gravity = 0.05;
const terminalVelocity = 5;

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case "ArrowLeft":
            vr = -0.05;
            break;
        case "ArrowRight":
            vr = 0.05;
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
    
    if (gamepad.axes?.[0] !== undefined) {
        let mapped = mapRange(gamepad.axes?.[0], -1, 1, -0.1, 0.1);
        vr = mapped;
    }

    if (gamepad.axes?.[3] !== undefined) {
        let mapped = mapRange(gamepad.axes?.[3], -1, 1, 0, 0.1);
        thrust = mapped;
    }

    ship.rotation += vr;
    const angle = ship.rotation;
    const ax = Math.cos(angle) * thrust;
    const ay = Math.sin(angle) * thrust;

    vx += ax;
    vy += ay;

    vy -= thrust;
    
    vy += gravity;

    console.log(vy);

    if (vy > terminalVelocity) {
        vy = terminalVelocity;
    }
    ship.x += vx;
    ship.y += vy;

    if ((ship.y) >= ground.groundLevel) {
        ship.y = ground.groundLevel;
        vy = 0;
    }

    if (ship.x < 0) {
        ship.x = canvas.width;
    } else if (ship.x > canvas.width) {
        ship.x = 0;
    }
    
    ground.draw(ctx);
    ship.draw(ctx);

    gamepad.update();
    gamepad.draw(ctx);

    requestAnimationFrame(animate);
})();
