const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const { height, width } = canvas;

context.scale(30, 30);

const matrix = [
    [0, 0, 0], [1, 1, 1], [0, 1, 0],
];

const player = {
    pos: { x: 5, y: 5 },
    matrix,
};


const drawMatrix = (shape, offset) => {
    shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = '#C33C23';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
};

const draw = () => {
    context.fillStyle = '#FEC952';
    context.fillRect(0, 0, width, height);
    drawMatrix(player.matrix, player.pos);
};

let dropCounter = 0;
const dropInterval = 1000;
let lastTime = 0;

const update = (time = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
        player.pos.y++;
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
};

update();
