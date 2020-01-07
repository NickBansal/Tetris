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


const createMatrix = (w, h) => {
    const newMatrix = [];
    while (h--) {
        newMatrix.push(new Array(w).fill(0));
    }
    return newMatrix;
};

const arena = createMatrix(12, 20);

const merge = (area, person) => {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
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

const playerDrop = () => {
    player.pos.y++;
    dropCounter = 0;
};


const update = (time = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
};

document.addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowLeft') {
        player.pos.x--;
    }
    if (key === 'ArrowRight') {
        player.pos.x++;
    }
    if (key === 'ArrowDown') {
        playerDrop();
    }
});

update();
