function Cell(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.alive = false;

    this.draw_me = function(){
        noFill();
        if(this.alive){
            fill('#fff');
        }
        //noStroke();
        rect(this.x*cell_size, this.y*cell_size, this.size, this.size);
    };
}
