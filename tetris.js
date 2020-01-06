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

const update = () => {
    draw();
    requestAnimationFrame(update);
};

update();
