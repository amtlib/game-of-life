var columns, rows;
var board;
var next;
var cell_size = 10;

function setup() {
    createCanvas(800, 800);
    rows = floor(height / cell_size);
    columns = floor(width / cell_size);
    //main board
    board = new Array(columns);
    for (var i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            board[i][j] = new Cell(i, j, cell_size);
        }
    }
    //next board
    next = new Array(columns);
    for (var i = 0; i < columns; i++) {
        next[i] = new Array(rows);
    }
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            next[i][j] = new Cell(i, j, cell_size);
        }
    }
    init();
}

function init() {
    //fills grid with random values (alive or death)
    //border's cells are always death
    for (var i = 1; i < columns - 1; i++) {
        for (var j = 1; j < rows - 1; j++) {
            board[i][j].alive = random() > 0.5;
        }
    }
}

function draw() {
    background('#212121');
    check();
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            board[i][j].draw_me();
        }
    }
}

function check() {
    for (var i = 1; i < columns - 1; i++) {
        for (var j = 1; j < rows - 1; j++) {
            board[i][j].alive_neighbors = 0;
            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    if (board[i + x][j + y].alive) {
                        board[i][j].alive_neighbors++;
                    }
                }
            }
            if (board[i][j].alive) {
                board[i][j].alive_neighbors--;
            }
            //game of life rules
            if (board[i][j].alive) {
                if (board[i][j].alive_neighbors < 2 || board[i][j].alive_neighbors > 3) {
                    next[i][j].alive = false;
                }
                else {
                    next[i][j].alive = true;
                }
            }
            else {
                if (board[i][j].alive_neighbors == 3) {
                    next[i][j].alive = true;
                }
                else {
                    next[i][j].alive = false;
                }
            }
        }
    }
    var temp = board;
    board = next;
    next = temp;
}
