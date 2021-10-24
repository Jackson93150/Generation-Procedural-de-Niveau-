//ANTHONIPILLAI JACKSON 19002768
export default class Sprite {
  constructor(Lx, Ly, posX, posY, RepetX, RepetY, direction) {
    this.direction = direction;
    this.Lx = Lx;
    this.Ly = Ly;
    this.posX = posX;
    this.posY = posY;
    this.RepetX = RepetX;
    this.RepetY = RepetY;
    this.all_img = [];
    this.img = new Image();
    this.anim_id = -1;
    this.cnv = document.getElementById("myCanvas");
    this.ctx = this.cnv.getContext("2d");
  }
  load() {
    let canvas1 = document.createElement("canvas");
    canvas1.width = this.Lx * this.RepetX;
    canvas1.height = this.Ly * this.RepetY;
    let context1 = canvas1.getContext("2d");
    context1.drawImage(
      this.img,
      0,
      0,
      this.Lx * this.RepetX,
      this.Ly * this.RepetY
    );
    for (let j = 0; j < 2; j += 1) {
      let imax = this.RepetX;
      for (let i = 0; i < imax; i += 1) {
        let canvasImageData1 = context1.getImageData(
          i * this.Lx,
          j * this.Ly,
          this.Lx,
          this.Ly
        );
        let canvas2 = document.createElement("canvas");
        canvas2.width = this.Lx;
        canvas2.height = this.Ly;
        let context2 = canvas2.getContext("2d");
        context2.putImageData(canvasImageData1, 0, 0);
        this.all_img.push(canvas2);
      }
    }
    this.anim_id = 0;
  }
  draw() { // fonction qui permet de dessiner les sprite en fonction de la direction du perrso
    if (this.direction == 1) {
      this.ctx.drawImage(
        this.all_img[this.anim_id],
        this.posX,
        this.posY,
        this.Lx,
        this.Ly
      );
      this.anim_id += 1;
      if (this.anim_id == 2) {
        this.anim_id = 0;
      }
    }
    if (this.direction == 2) {
      this.ctx.drawImage(
        this.all_img[this.anim_id],
        this.posX,
        this.posY,
        this.Lx,
        this.Ly
      );
      this.anim_id += 1;
      if (this.anim_id == 5) {
        this.anim_id = 3;
      }
    }
  }
  // fonction de deplacement en fonction des direction
  updatepos(y,y2){
    if(this.direction == 2){
      this.posY -= 2;
      if(this.posY <= (y2+1)*16){
        this.anim_id = 0;
        this.direction = 1;
      }
    }
    if(this.direction == 1){
      this.posY +=2;
      if(this.posY >= (y-1)*16){
        this.anim_id = 3;
        this.direction = 2;
      }
    }
  }
  updatepos2(x,x2){
    if(this.direction == 2){
      this.posX -= 2;
      if(this.posX <= (x+1)*16){
        this.anim_id = 0;
        this.direction = 1;
      }
    }
    if(this.direction == 1){
      this.posX +=2;
      if(this.posX >= (x2-1)*16){
        this.anim_id = 3;
        this.direction = 2;
      }
    }
  }
}
