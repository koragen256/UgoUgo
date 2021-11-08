let lines = [];
let linebuffer = [];
let draggingline = [];
let isDragged = false;
let myh;
let mxh;

let vaib = 4;
let spaceLen=20;

function setup() {

    canvas = createCanvas(windowWidth, windowHeight);//2Dの場合は引数にWEBGLは要らない
    canvas.position(0, 0);//canvasをページの原点に固定
    canvas.style('z-index', '-1');//canvasを後ろに移動する
    background(0);
    frameRate(12);

    draggingline = [];
    linebuffer = [];
    lines = [];
}

function mouseDragged() {
    if (!isDragged) {
        mxh = mouseX;
        myh = mouseY;
        isDragged = true;
    } else {
        if (GetdistSqrt(mxh, myh, mouseX, mouseY) > spaceLen) {
            draggingline.push([mxh, myh, mouseX, mouseY]);
            linebuffer.push([mxh, myh, mouseX, mouseY]);
            mxh = mouseX;
            myh = mouseY;
        }
    }
}

function mouseReleased() {
    isDragged = false;
    if (linebuffer.length > 0) {
        lines.push(linebuffer);
    }
    linebuffer = [];
    draggingline = [];
}

function GetdistSqrt(x0, y0, x1, y1) {
    return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

function keyPressed(){
    if(key=="z"){
        lines.pop();
    }
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(4);


    for (let l of lines) {
        let xt = l[0][0]+ random(-vaib, vaib);
        let yt = l[0][1]+ random(-vaib, vaib);
        for (let x of l) {
            let tx = x[2] + random(-vaib, vaib);
            let ty = x[3] + random(-vaib, vaib);
            line(xt, yt, tx, ty);
            xt = tx;
            yt = ty;
        }
    }

    for (let x of draggingline) {
        line(x[0], x[1], x[2], x[3]);
    }

}