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


// --- Animation loop ---
(function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Gamepad input ---
    if (gamepad.axes?.[0] !== undefined) {
        vr = mapRange(gamepad.axes[0], -1, 1, -0.05, 0.05); // roll
    }

    if (gamepad.axes?.[3] !== undefined) {
        thrust = mapRange(gamepad.axes[3], -1, 1, 0, 0.15); // throttle
    }

    // --- Update rotation ---
    ship.rotation += vr;

    // --- Apply thrust along drone's rotated direction ---
    const angle = ship.rotation; // rotation in radians
    const ax = Math.cos(angle) * thrust; // horizontal component
    const ay = Math.sin(angle) * thrust; // vertical component

    vx += ax;
    vy += ay;

    // --- Apply gravity ---
    vy += gravity;

    // --- Clamp vertical velocity ---
    if (vy > terminalVelocity) vy = terminalVelocity;
    if (vy < -terminalVelocity) vy = -terminalVelocity;
    
    vx *= 0.99;

    // --- Update position ---
    ship.x += vx;
    ship.y += vy;

    // --- Ground collision ---
    if (ship.y >= ground.groundLevel) {
        ship.y = ground.groundLevel;
        vy = 0;
        vx *= 0.8; // optional: damp horizontal velocity on landing
    }

    // --- Wrap horizontally ---
    if (ship.x < 0) ship.x = canvas.width;
    else if (ship.x > canvas.width) ship.x = 0;

    // --- Draw ---
    ground.draw(ctx);
    ship.draw(ctx);

    // --- Update gamepad visuals ---
    gamepad.update();
    gamepad.draw(ctx);

    requestAnimationFrame(animate);
})();