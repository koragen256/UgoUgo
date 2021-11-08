let lines = [];
let linebuffer = [];
let draggingline = [];
let isDragged = false;
let myh;
let mxh;

let bgcolindex = 0;
let seleColindex = 0;
let size = 4;
let ispen = true;

let canvas;

const BGcoltable = [[000, 000, 000,false,"ぶらっく"],
[178, 178, 178,true,"ぬくぬく"],
[255, 255, 255,true,"ほわいと"],
]


const coltable = [[255, 255, 255],
[000, 000, 000],
[255, 000, 000],
[255, 166, 000],
[255, 255, 000],
[166, 255, 000],
[000, 255, 000],
[000, 255, 166],
[000, 255, 255],
[000, 166, 255],
[000, 000, 255],
[166, 000, 255],
[255, 000, 255],
[255, 000, 166],
]

let vaib = 3;
let spaceLen = 20;



async function sGif() {
    console.log("asas");
    createCanvas(windowWidth, windowHeight);
    frameRate(12);
    saveE.text="せーぶちゅうだよ";
    createLoop({ duration: 2,  gif: { fileName: "UGO.gif" ,render:false,open:true,download:true}});
}

function changebg(){
    bgcolindex = (bgcolindex + 1) % BGcoltable.length;
    let element = document.getElementsByTagName('a');
    haike.text="はいけい["+BGcoltable[bgcolindex][4]+"]"
    var theme=BGcoltable[bgcolindex][3];
    for(elm of element){
        if(!theme){
            elm.style.color="White";
        }else{
            elm.style.color="Black";
        }
        
    }
    if(theme){
        andu.style.color="#000000";
    }else{
        andu.style.color="#ff7300";
    }
    
}

function changchoten() {
    spaceLen = (spaceLen) % 100 + 10;
    sLen.text = "あらさ[" + spaceLen / 20 + "]";
}

function changesize() {
    size = (size) % 10 + 1;
    futosa.text = "ふとさ[" + size + "]";
}

function togglecol() {
    seleColindex = (seleColindex + 1) % coltable.length;
    let r = coltable[seleColindex][0];
    let g = coltable[seleColindex][1];
    let b = coltable[seleColindex][2];
    colbutton.style.color = "rgb(" + r + "," + g + "," + b + ")";
    colbutton.text = "いろへんこー[" + seleColindex + "]";
    console.log("#" + r + g + b + ";");
}

function toggletool() {
    ispen = !ispen;
    if (ispen) {
        toolmode.text = "ぺん";
    } else {
        toolmode.text = "いれいざー";
    }
}

function keyPressed() {
    if (key == "z") {
        undo();
    }
}

function undo() {
    lines.pop();
}


function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);//canvasをページの原点に固定
    canvas.style('z-index', '-1');//canvasを後ろに移動する
    frameRate(12);
    background(0);

    draggingline = [];
    linebuffer = [];
    lines = [];
}

function mouseDragged() {
    if (ispen) {
        if (!isDragged) {
            mxh = mouseX;
            myh = mouseY;
            isDragged = true;
        } else {
            if (GetdistSqrt(mxh, myh, mouseX, mouseY) > spaceLen) {
                draggingline.push([mxh, myh, mouseX, mouseY, seleColindex, size]);
                linebuffer.push([mxh, myh, mouseX, mouseY, seleColindex, size]);
                mxh = mouseX;
                myh = mouseY;
            }
        }
    }

}

function mouseReleased() {
    if (ispen) {
        isDragged = false;
        if (linebuffer.length > 0) {
            lines.push(linebuffer);
        }
        linebuffer = [];
        draggingline = [];
    }
}

function GetdistSqrt(x0, y0, x1, y1) {
    return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}


function draw() {
    background(BGcoltable[bgcolindex][0],BGcoltable[bgcolindex][0],BGcoltable[bgcolindex][0]);
    stroke(255);

    fill(coltable[seleColindex][0], coltable[seleColindex][1], coltable[seleColindex][2]);
    //circle(width*0.1,height-width*0.1,width*0.1);


    for (let l of lines) {
        let xt = l[0][0] + random(-vaib, vaib);
        let yt = l[0][1] + random(-vaib, vaib);
        for (let x of l) {
            stroke(coltable[x[4]][0], coltable[x[4]][1], coltable[x[4]][2]);
            let tx = x[2] + random(-vaib, vaib);
            let ty = x[3] + random(-vaib, vaib);
            strokeWeight(x[5]);
            line(xt, yt, tx, ty);
            xt = tx;
            yt = ty;


        }
    }

    for (let x of draggingline) {
        strokeWeight(x[5]);
        stroke(coltable[seleColindex][0], coltable[seleColindex][1], coltable[seleColindex][2]);
        line(x[0], x[1], x[2], x[3]);
    }

}