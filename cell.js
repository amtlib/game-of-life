function Cell(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alive = false;
    this.alive_neighbors = 0;
    this.draw_me = function () {
        noFill();
        //if cell is alive - fill it with white color
        if (this.alive) {
            fill('#fff');
        }
        rect(this.x * cell_size, this.y * cell_size, this.size, this.size);
    };
}
