//ANTHONIPILLAI JACKSON 19002768
import Sprite from "./Sprite.js";
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
ctx.imageSmoothingEnabled = false;
let all_img = [];
let img = new Image();
let anim_id = -1;
let state = 0;
let stock = [];
let stock2 = [];
let stockx = [];
let stockx2 = [];
let spritevec = [];
let spritevec2 = [];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//on va créer un tableau a 2d pour pouvoir afficher notre map
function Create2DArray(rows,columns) {
  let x = new Array(rows);
  for (let i = 0; i < rows; i++) {
      x[i] = new Array(columns);
  }
  for(let i=0;i<rows;i++){
    for(let j=0;j<columns;j++){
      let z = getRndInteger(0,3)
      if(z == 0){
        x[i][j]= 12 ;
      }
      if(z == 1){
        x[i][j]= 13 ;
      }
      if(z == 2){
        x[i][j]= 15 ;
      }
      else{
        x[i][j]= 14 ;
      }
    }
}
  return x;
}


let array = Create2DArray(50,50);

//on va push tous les tiles de la map dans all_img
img.src = "./tilemaps/map.png";
img.onload = function () {
  let canvas1 = document.createElement("canvas");
  canvas1.width = 16 * 39;
  canvas1.height = 16 * 1;
  let context1 = canvas1.getContext("2d");
  context1.drawImage(img, 0, 0, 16 * 39, 16 * 1);
  for (let j = 0; j < 1; j += 1) {
    let imax = 39;
    for (let i = 0; i < imax; i += 1) {
      let canvasImageData1 = context1.getImageData(i * 16, j * 16, 16, 16);
      let canvas2 = document.createElement("canvas");
      canvas2.width = 16;
      canvas2.height = 16;
      let context2 = canvas2.getContext("2d");
      context2.putImageData(canvasImageData1, 0, 0);
      all_img.push(canvas2);
    }
  }
  anim_id = 0;
};

//fonction qui va nous permmettre de faire apparaitre une tile specifique dans la map
function create_item(x,y,item){
  array[y][x] = item;
}

// function qui va nous permmettre de creer notre salle
function create_room(miny,maxy,minx,maxx,minx2,maxx2,min2y,max2y){
  let startgy = getRndInteger(miny,maxy);// valeur en y en haut a gauche de la salle 
  let startgx = getRndInteger(minx,maxx);// valeur en x en haut a gauche de la salle 
  let startdx = getRndInteger(minx2,maxx2); // valeur en x en haut a droite de la salle
  let endgy = getRndInteger(min2y,max2y); // valeur en y en bas a gauche de la salle

  // on va ensuite tout push dans leur vecteur respectif
  stock.push(endgy);
  stock2.push(startgy);
  stockx.push(startgx);
  stockx2.push(startdx);

  // creation de valeur random dans les coordonnée a l'interieur de la salle
  let xrand = getRndInteger(startgx+3,startdx-3);
  let yrand = getRndInteger(startgy+3,endgy-3);

  let coffrex = getRndInteger(startgx+1,startdx-1);
  let coffrey = getRndInteger(startgy+1,endgy-1);

  let clex = getRndInteger(startgx+1,startdx-1);
  let cley = getRndInteger(startgy+1,endgy-1);

  let spritex = getRndInteger(startgx+3,startdx-3);
  let spritey = getRndInteger(startgy+3,endgy-3);

  let spritex2 = getRndInteger(startgx+3,startdx-3);
  let spritey2 = getRndInteger(startgy+3,endgy-3);

  let bg = getRndInteger(0,1);
  let ss = getRndInteger(0,1);
  // création des ennemies qui seront present dans la map
  let sprite1 = new Sprite(16,16,spritex*16,spritey*16,6,1,1);
  if (bg == 0){
    sprite1.img.src = "./tilemaps/bat.png";
  }
  else{
    sprite1.img.src = "./tilemaps/ghost.png";
  }
  sprite1.img.onload = function () {
    sprite1.load();
  }
  // qu'on va ensuite push dans un vecteur
  spritevec.push(sprite1);

  let sprite2 = new Sprite(16,16,spritex2*16,spritey2*16,6,1,1);
  if (ss == 0){
    sprite2.img.src = "./tilemaps/sket.png";
  }
  else{
    sprite2.img.src = "./tilemaps/slime.png";
  }
  sprite2.img.onload = function () {
    sprite2.load();
  }

  spritevec2.push(sprite2);
  // si les coordonée du coffre et de la clée sont identique on rechange les coordonée
  while (xrand == coffrex || yrand == coffrey || xrand == clex || yrand == cley || coffrex == clex || coffrey == cley){
    coffrex = getRndInteger(startgx+1,startdx-1);
    coffrey = getRndInteger(startgy+1,endgy-1); 
    clex = getRndInteger(startgx+1,startdx-1);
    cley = getRndInteger(startgy+1,endgy-1);
  }

  // on va placer les tiles au 4 coin de la map 
  array[startgy][startgx] = 21;
  array[startgy][startdx] = 22;
  array[endgy][startgx] = 23;
  array[endgy][startdx] = 24;
  // on va ensuite relier les 4 coin de la map  
  for(let i = startgx+1 ; i < startdx; i++){
    let wall = getRndInteger(0,2);
    if (wall == 0){
      array[startgy][i] = 0;
    }
    if (wall == 1){
      array[startgy][i] = 37;
    }
    else{
      array[startgy][i] = 38;
    }
  }
  for(let i = startgy+1 ; i < endgy; i++){
    array[i][startgx] = 21;
  }
  for(let i = startgy+1 ; i < endgy; i++){
    array[i][startdx] = 22;
  }
  for(let i = startgx+1 ; i < startdx; i++){
    array[endgy][i] = 25;
  }
  // on va ensuite remplir linterieur de la salle par soit un sol en pierre ou en bois
  let rst = getRndInteger(0,3);
  for(let i = startgx+1 ; i < startdx; i++){
    for(let j = startgy+1 ; j < endgy; j++){
      let x = getRndInteger(0,3);
      if (rst != 2){
        if(x == 1){
          array[j][i] = 3;
        }
        else{
          array[j][i] = 1;
        }
      }
      else {
        array[j][i] = 2;
      }
    }
  }
  // creation coffre/cle
  create_item(coffrex,coffrey,28);
  if (rst == 2){
    create_item(clex,cley,32);
  }
  else{
    create_item(clex,cley,33);
  }
  // creation d'autre item
  for(let i = 0 ; i < getRndInteger(1,2); i++){
    if (rst == 2){
      create_item(getRndInteger(startgx+1,startdx-1),getRndInteger(startgy+1,endgy-1),11);
    }
    else{
      create_item(getRndInteger(startgx+1,startdx-1),getRndInteger(startgy+1,endgy-1),7);
    }
  }
  for(let i = 0 ; i < getRndInteger(1,2); i++){
    if (rst == 2){
      create_item(getRndInteger(startgx+1,startdx-1),getRndInteger(startgy+1,endgy-1),10);
    }
    else{
      create_item(getRndInteger(startgx+1,startdx-1),getRndInteger(startgy+1,endgy-1),6);
    }
  }
  for(let i = 0 ; i < getRndInteger(1,2); i++){
    if (rst == 2){
      create_item(getRndInteger(startgx+1,startdx-1),getRndInteger(startgy+1,endgy-1),9);
    }
    else{
      create_item(getRndInteger(startgx+1,startdx-1),getRndInteger(startgy+1,endgy-1),5);
    }
  }
  for(let i = 0 ; i < getRndInteger(1,2); i++){
    create_item(getRndInteger(startgx+1,startdx-1),getRndInteger(startgy+1,endgy-1),4);
  }
}

// fonction qui va permmettre de generer tous le niveau
function generate_level(miny,maxy,minx,maxx,minx2,maxx2,min2y,max2y,bridge1,bridge2,bridge3,room){
  // creation des room en fonction du nombre de room demander
  let x;
  if (room == 2){
    create_room(miny,maxy,minx,maxx,minx2,maxx2,min2y,max2y);
    create_room(miny,maxy,minx+25,maxx+25,minx2+25,maxx2+25,min2y,max2y);
    x = 0;
  }
  if (room == 3){
    create_room(miny,maxy,minx,maxx,minx2,maxx2,min2y,max2y);
    create_room(miny+20,maxy+20,minx,maxx,minx2,maxx2,min2y+27,max2y+29);
    create_room(miny,maxy+5,minx-35,maxx-35,minx2-20,maxx2-19,min2y+32,max2y+33);
    x = 2;
  }
  if (room == 4){
    create_room(miny,maxy,minx,maxx,minx2,maxx2,min2y,max2y);
    create_room(miny+20,maxy+20,minx,maxx,minx2,maxx2,min2y+27,max2y+29);
    create_room(miny,maxy,minx-35,maxx-35,minx2-20,maxx2-19,min2y+7,max2y+9);
    create_room(miny+30,maxy+30,minx-35,maxx-35,minx2-20,maxx2-19,min2y+32,max2y+33);
    x = 3;
  }
  // creation des intersection en prenant 2 coordonée qui peuvent se rejoindre en ligne droite entre les salles
  if (room == 2 || room == 3 || room == 4){
    array[bridge3][stockx[1]] = 1;
    array[bridge3-1][stockx[1]] = 36;
    array[bridge3+1][stockx[1]] = 27;
    array[bridge3][stockx2[x]] = 1;
    array[bridge3-1][stockx2[x]] = 35;
    array[bridge3+1][stockx2[x]] = 26;

    for(let i = stockx2[x]+1 ; i < stockx[1] ; i++){
      array[bridge3-1][i] = 20;
      array[bridge3][i] = 1;
      array[bridge3+1][i] = 25;
    }
  }
  if (room == 3 || room == 4){
    array[stock[0]][bridge1] = 1;
    array[stock[0]][bridge1-1] = 27; 
    array[stock[0]][bridge1+1] = 26;
    array[stock2[1]][bridge1] = 34;

    for(let i = stock[0]+1 ; i < stock2[1] ; i++){
      array[i][bridge1-1] = 21;
      array[i][bridge1] = 1;
      array[i][bridge1+1] = 22;
    }
  }
  if (room == 4){
    array[stock[2]][bridge2] = 1;
    array[stock[2]][bridge2-1] = 27; 
    array[stock[2]][bridge2+1] = 26;
    array[stock2[3]][bridge2] = 34; 

    for(let i = stock[2]+1 ; i < stock2[3] ; i++){
      array[i][bridge2-1] = 21;
      array[i][bridge2] = 1;
      array[i][bridge2+1] = 22;
    }
  }
}
// fonction qui va permmettre de dessiner le niveau sur lecrant
function draw() {
  if(state == 0){
    // on va choisir de facon aleatoire le nombre de salle entre 2 et 4
    let x = getRndInteger(2,4);
    // on va ensuite generer le niveau
    if (x == 2){
      generate_level(0,10,0,6,20,25,45,49,0,0,28,x);
    }
    else{
      generate_level(0,5,35,40,45,49,13,16,42,16,37,x);
    }
    
    state = 1;
  }
  // on va placer toutes les tiles
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      anim_id = array[i][j];
      ctx.drawImage(all_img[anim_id], j * 16, i * 16, 16, 16);
    }
  }
  // deplacement des ennemies a linterieur des salles
  for (let i = 0 ; i < spritevec.length ; i++){
    spritevec2[i].updatepos2(stockx[i],stockx2[i]);
    spritevec[i].updatepos(stock[i],stock2[i]);
    spritevec[i].draw();
    spritevec2[i].draw();
  }
}

function update() {
  draw();
}

setInterval(update, 50);
