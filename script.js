var columns, rows;
var board;
var next_board;

var cell_size = 10;

function setup(){
    createCanvas(100,80);
    rows = height/cell_size;
    columns = width/cell_size;

    board = new Array(columns);

    for(var i = 0; i < columns;i++){
        board[i] = new Array(rows);
    }
    for(var i = 0;i<columns;i++){
        for(var j = 0;j<rows;j++){
            board[rows][columns] = new Cell(i, j, cell_size);
        }
    }
}
function draw(){

}
