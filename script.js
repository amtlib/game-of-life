var columns, rows;
var board;
var next_board;

var cell_size = 10;

function setup(){
    createCanvas(600,400);
    rows = floor(height/cell_size);
    columns = floor(width/cell_size);

    //main board
    board = new Array(columns);

    for(var i = 0; i < columns;i++){
        board[i] = new Array(rows);
    }
    for(var i = 0;i<columns;i++){
        for(var j = 0;j<rows;j++){
            board[i][j] = new Cell(i, j, cell_size);
        }
    }
    //next board
    next = board.slice();
init();
}
function init(){
    //fills grid random values (alive or death)

    for(var i = 0;i<columns;i++){
        for(var j = 0;j<rows;j++){
            //border's cells are always death
            if(i==0 || j==0 || i == columns - 1 || j == rows - 1){
                board[i][j].alive = false;
            }else{
                board[i][j].alive = random() > 0.5 ? true : false;
            }
        }
    }
}
function draw(){
    background('#212121');
    for(var i = 0;i<columns;i++){
        for(var j = 0;j<rows;j++){
            board[i][j].draw_me();
        }
    }
}
