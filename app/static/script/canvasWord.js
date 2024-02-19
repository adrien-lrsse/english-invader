export function CanvasWord(unknown, guess, posX, posY){
    this.unknown = unknown;
    this.guess = guess;
    this.posX = posX;
    this.posY = posY;
    this.updatePos = function(){
        this.posY++;
    }
}