const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;

const game = new Game(ctx, canvas);
game.init();

let lastTime = 0;

function loop(time) {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(dt);
    game.draw();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
