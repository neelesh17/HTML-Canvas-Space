//kuler - website for chosing color palets
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d'); //c - context

// //rectangle
// c.fillStyle = "rgba(255, 0, 0, 0.5)"; //preceeds the rectangle the you want to fill
// c.fillRect(100, 100, 100, 100); // fillRect(x,y,width,height)
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(500, 600, 100, 100); // fillRect(x,y,width,height)
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(700, 300, 100, 100); // fillRect(x,y,width,height)


// //line
// c.beginPath();
// c.moveTo(50, 300);  //moveTo(x,y)
// c.lineTo(300, 100);
// c.strokeStyle = "rgba(0, 255, 0, 1)";
// c.stroke();
// c.lineTo(800, 400);   //(x,y)
// c.strokeStyle = "rgba(0, 0, 255, 1)";
// c.stroke();

// let counter = false;
// //arc / circle
// for(let i=1;i<30;i++){
//     let x = Math.random()*window.innerWidth;
//     let y = Math.random()*window.innerHeight;
//     let red = Math.random()*255;
//     let blue = Math.random()*255;
//     let green = Math.random()*255;
//     counter = !counter;
//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI *1,counter) //(x,y,radius, startangle(radian), endangle(radian), counterclockwise),y,radius, startangle(radian), endangle(radian), counterclockwise)
//     c.strokeStyle = "rgba("+red+","+ green+"," +blue+", 1)";
//     c.stroke()
// }

let mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 40, minRadius = 2;


window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

window.addEventListener('click', function(){
    for(let i=0;i<4;i++){
        let radius = (Math.random() * 9) + 1;
        let x = mouse.x;
        let y = mouse.y;
        let dx = (Math.random() - 0.5)*2;
        let dy = (Math.random() - 0.5)*2;
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
})

function Circle(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false) ;
        c.fillStyle = 'gray';
        c.fill();
    }
    this.update = function() {
        if(this.x+this.radius>innerWidth || this.x-this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y+this.radius>innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(Math.abs(mouse.x - this.x) < 300 && Math.abs(mouse.y - this.y) < 300) {
            c.beginPath();
            c.moveTo(this.x, this.y);  
            c.lineTo(mouse.x, mouse.y);
            let diagonal = Math.sqrt(Math.pow(Math.abs(mouse.x - this.x),2) + Math.pow(Math.abs(mouse.y - this.y),2));
            c.strokeStyle = `rgba(168, 168, 168,${1 - (diagonal*0.004)})`;
            c.stroke();
            c.closePath();
        } 

        this.draw();
    }
}

let circleArray = [];
function init() {
    circleArray = [];
    for(let i=0;i<200;i++){
        let radius = (Math.random() * 9) + 1;
        let x = Math.random() * (innerWidth - radius*2) + radius;
        let y = Math.random() * (innerHeight - radius*2) + radius;
        let dx = (Math.random() - 0.5)*1;
        let dy = (Math.random() - 0.5)*1;
    
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);  
    for(let i=0;i<circleArray.length;i++){
        circleArray[i].update();
        for(let j=i+1;j<circleArray.length;j++){
            if(Math.abs(circleArray[i].x - circleArray[j].x) < 100 && Math.abs(circleArray[i].y - circleArray[j].y) < 100){
                c.beginPath();
                c.moveTo(circleArray[i].x,circleArray[i].y);  
                c.lineTo(circleArray[j].x, circleArray[j].y);
                let op = Math.sqrt(Math.pow(Math.abs(circleArray[i].x - circleArray[j].x),2)+ Math.pow(Math.abs(circleArray[i].y - circleArray[j].y),2));
                c.strokeStyle = `rgba(168, 168, 168,${(op * 0.00154)})`;
                c.stroke();
            }
        }
    }
    c.font = "bold 60px Balsamiq Sans";
    c.fillStyle = "rgba(0, 242, 255, 1)";
    c.textAlign = "center";
    c.textBaseline = "ideographic";
    let ctext = "SPACE WEB".split("").join(String.fromCharCode(8201))
    c.fillText(ctext, canvas.width/2, canvas.height/2);
    c.font = "40px Crimson Text";
    c.fillText("Jul 25, 2020", canvas.width/2, canvas.height/2 + 100); 
    c.beginPath();
    c.moveTo(canvas.width/2 - 100 , canvas.height/2 + 20);
    c.lineTo(canvas.width/2 + 100, canvas.height/2 + 20); 
    c.strokeStyle = "rgba(0, 242, 255, 1)";
    c.lineWidth = 2.5;
    c.stroke();
    c.closePath();
}
init();
animate();