let width, height, boxWidth, position, offset;
let currentPlayer, imgWidth, flg;
function preload() {
    xImage = loadImage('assets/x.png');
    oImage = loadImage('assets/o.png');
}

function setup() {
    width = innerWidth;
    height = innerHeight - 4;
    boxWidth = 150;
    position = [];
    offset = 100;
    currentPlayer = 1;
    imgWidth = 100;
    flg = 1;
    createCanvas(width, height);
    initialiseGridArray();
}

function draw() {
    background(200);
    drawLines();
    drawPlayers();
    winner = checkWinner();
    if(checkDraw(winner)) {
        stroke(0);
        strokeWeight(1);
        textSize(32);
        text("DRAW!", width / 2 - 20, 40);
    }
    if(winner != -1) {
        stroke(0);
        strokeWeight(1);
        textSize(32);
        if(winner == 1) {
            text("X wins", width / 2, 40);
        } else {
            text("O wins", width / 2, 40);
        }
    }
}

function drawPlayers() {
    for (let i = 0; i < position.length; i++) {
        if (position[i].input == 0) {
            image(oImage, position[i].x, position[i].y, imgWidth, imgWidth);
        } else if (position[i].input == 1) {
            image(xImage, position[i].x, position[i].y, imgWidth, imgWidth);
        } else {
            continue;
        }
    }
}

function checkDraw(winner) {
    if(winner == -1) {
        for(let i = 0; i < position.length; i++) {
            if(position[i].input == -1) {
                return 0;
            }
        }
        return 1;
    }
    return 0;
}

function checkWinner() {
    pos = position;
    strokeWeight(5);
    stroke(0, 255, 0);
    if ((pos[0].input == pos[1].input) && (pos[1].input == pos[2].input) && pos[2].input != -1) {
        line(width / 2 - 3 * boxWidth / 2 - 10, offset + boxWidth / 2, width / 2 + 3 * boxWidth / 2, offset + boxWidth / 2);
        return pos[0].input;
    } else if ((pos[3].input == pos[4].input) && (pos[4].input == pos[5].input) && pos[5].input != -1) {
        line(width / 2 - 3 * boxWidth / 2 - 10, offset + 3 * boxWidth / 2, width / 2 + 3 * boxWidth / 2, offset + 3 * boxWidth / 2);
        return pos[3].input;
    } else if ((pos[6].input == pos[7].input) && (pos[7].input == pos[8].input) && pos[8].input != -1) {
        line(width / 2 - 3 * boxWidth / 2 - 10, offset + 5 * boxWidth / 2, width / 2 + 3 * boxWidth / 2, offset + 5 * boxWidth / 2);
        return pos[6].input;
    } else if ((pos[0].input == pos[3].input) && (pos[3].input == pos[6].input) && pos[6].input != -1) {
        line(width / 2 - boxWidth, offset - 10, width / 2 - boxWidth, offset + 3 * boxWidth + 10);
        return pos[0].input;
    } else if ((pos[1].input == pos[4].input) && (pos[4].input == pos[7].input) && pos[7].input != -1) {
        line(width / 2, offset - 10, width / 2, offset + 3 * boxWidth + 10);
        return pos[1].input;
    } else if ((pos[2].input == pos[5].input) && (pos[5].input == pos[8].input) && pos[8].input != -1) {
        line(width / 2 + boxWidth, offset - 10, width / 2 + boxWidth, offset + 3 * boxWidth + 10);
        return pos[2].input;
    } else if ((pos[0].input == pos[4].input) && (pos[4].input == pos[8].input) && pos[8].input != -1) {
        line(width / 2 - 3 * boxWidth / 2, offset, width / 2 + 3 * boxWidth / 2, offset + 3 * boxWidth);
        return pos[0].input;
    } else if ((pos[2].input == pos[4].input) && (pos[4].input == pos[6].input) && pos[6].input != -1) {
        line(width / 2 + 3 * boxWidth / 2, offset, width / 2 - 3 * boxWidth / 2, offset + 3 * boxWidth);
        return pos[2].input;
    } else {
        return -1;
    }

}

function mousePressed() {
    pos = returnGridPosition(mouseX, mouseY);
    if (position[pos].input == -1 || flg == 1) {
        position[pos].input = currentPlayer;
        imageMode(CENTER);
        currentPlayer = !currentPlayer;
        flg = 0;
    }
}

function returnGridPosition(x, y) {
    if ((x < width / 2 - boxWidth / 2) && (y < offset + boxWidth)) {
        return 0;
    } else if ((x < width / 2 + boxWidth / 2) && (y < offset + boxWidth) && (x > width / 2 - boxWidth / 2)) {
        return 1;
    } else if ((x > width / 2 + boxWidth / 2) && (y < offset + boxWidth)) {
        return 2;
    } else if ((x < width / 2 - boxWidth / 2) && (y > offset + boxWidth) && (y < offset + 2 * boxWidth)) {
        return 3;
    } else if ((x < width / 2 + boxWidth / 2) && (y > offset + boxWidth) && (x > width / 2 - boxWidth / 2) && (y < offset + 2 * boxWidth)) {
        return 4;
    } else if ((x > width / 2 + boxWidth / 2) && (y > offset + boxWidth) && (y < offset + 2 * boxWidth)) {
        return 5;
    } else if ((x < width / 2 - boxWidth / 2) && (y > offset + 2 * boxWidth)) {
        return 6;
    } else if ((x < width / 2 + boxWidth / 2) && (y > offset + 2 * boxWidth) && (x > width / 2 - boxWidth / 2)) {
        return 7;
    } else if ((x > width / 2 + boxWidth / 2) && (y > offset + 2 * boxWidth)) {
        return 8;
    } else {
        return -1;
    }
}

function initialiseGridArray() {
    let tempX, tempY, ctr;
    ctr = 0;
    tempY = offset + boxWidth / 2
    for (let i = 0; i < 3; i++) {
        tempX = width / 2 - boxWidth;
        for (let j = 0; j < 3; j++) {
            position[ctr++] = new Box(tempX, tempY);
            tempX += boxWidth;
        }
        tempY += boxWidth;
    }
}

function drawLines() {
    stroke(0);
    strokeWeight(3);
    line(width / 2 - boxWidth / 2, offset, width / 2 - boxWidth / 2, 3 * boxWidth + offset);
    line(width / 2 + boxWidth / 2, offset, width / 2 + boxWidth / 2, 3 * boxWidth + offset);
    line(width / 2 - 3 * boxWidth / 2, boxWidth + offset, width / 2 + 3 * boxWidth / 2, boxWidth + offset);
    line(width / 2 - 3 * boxWidth / 2, 2 * boxWidth + offset, width / 2 + 3 * boxWidth / 2, 2 * boxWidth + offset)
}

class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.input = -1;
    }
}