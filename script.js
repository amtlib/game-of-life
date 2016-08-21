var columns, rows; //according to canvas size
var board; //accual board
var next; //board in next frame
var cell_size = 10; //single cell size
var running = false; //when running == true -> script changes state of cells according to 'game of life' rules
var game_speed = 2; //starting game speed when running is true

//user interface
//running checkbox
document.querySelector('input[type="checkbox"]').addEventListener('change', function () {
    running = !running;
});
//speed range
document.querySelector('input[type="range"]').addEventListener('input', function () {
    game_speed = parseInt(document.querySelector('input[type="range"]').value);
});
//random cells
document.getElementById('random_button').addEventListener('click', init);

function setup() {
    createCanvas(800, 600);
    //board rows and cols - according to size of canvas
    rows = floor(height / cell_size);
    columns = floor(width / cell_size);
    //main board
    board = new Array(columns);
    for (var i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
    //fill board with cell objects
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
    //fill next board with cell objects
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            next[i][j] = new Cell(i, j, cell_size);
        }
    }
}

function mousePressed() {
    //when user clicks on the board function looks for coords of clicked cell and changes it's state
    //i do not wanna change state of the border cells, because they should be always death
    for (var i = 1; i < columns - 1; i++) {
        for (var j = 1; j < rows - 1; j++) {
            if (mouseX >= board[i][j].x * board[i][j].size && mouseX < board[i][j].x * board[i][j].size + board[i][j].size) {
                if (mouseY >= board[i][j].y * board[i][j].size && mouseY < board[i][j].y * board[i][j].size + board[i][j].size) {
                    board[i][j].alive = !board[i][j].alive;
                }
            }
        }
    }
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
    //background - dark grey
    background('#212121');

    //draw all cells on the board
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            board[i][j].draw_me();
        }
    }
    //if running checkbox is selected
    if (running) {
        //change speed of game according to user choice
        frameRate(game_speed);

        //applies 'game of life' rules - changes state of the board
        check();
    }
    else {
        //running is not selected
        //user input is smooth
        frameRate(120);
    }
}

function check() {
    //applies game of life rules on the board

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
