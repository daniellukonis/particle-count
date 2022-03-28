const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const particles = [];
let tick = 100;

function resizeCanvas(){
    canvas.width = window.innerWidth-10;
    canvas.height = window.innerHeight -10;
}
resizeCanvas();

class FPS{
    constructor(){
    this.xstart = 1;
    this.xfinish = 1;
    this.xframe = 1;
    this.delta = 1;
    this.tfps = 60;
    }

    monitor(){
        this.xfinish = window.performance.now();
        this.delta = this.xfinish - this.xstart;
        if(this.delta >= 1000){
            this.xstart = this.xfinish;
            this.tfps = Math.floor(this.xframe / this.delta * 1000);
            this.xframe = 0;
        }
        this.xframe += 1;
    }

    read(){
        console.log(this.tfps);
        return this.tfps;
    }

    display(){
        context.save();
        context.fillStyle = 'rgba(15,15,15,0.5)';
        context.font = '20px serif';
        context.textBaseline = 'top';   
        context.fillText(`${this.tfps} FPS | ${particles.length} PARTICLES`, 10 , 10);
    }
}

const fps = new FPS;
function loop(){
    window.requestAnimationFrame(loop);
    fps.monitor();

    if(tick % 1 === 0){
        createParticles();
        // fps.read();
    }
    tick += 1;
    updateParticles();
    killParticles();
    drawParticles();
    fps.display();    
}

window.requestAnimationFrame(loop);

const gravity = .5;
function createParticles(){
    particles.push({
        x: Math.random()*canvas.width,
        y: 0,
        speed: (1+Math.random()*2)*gravity,
        radius: 5+Math.random()*5,
        color: `rgba(150,150,150,${Math.random()})`
    });
        
}

function updateParticles(){
    for(let i in particles){
        let part = particles[i];
        part.y += part.speed;
        }
}

const maxSnow = canvas.width*canvas.height/500;
function killParticles(){
    for(let i in particles){
        let part = particles[i];
        if(part.y > canvas.height){
            part.speed = 0;
            if(maxSnow<particles.length){
                particles.shift();
            }
        }
    }
}

function drawParticles(){
    context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(0,0,canvas.width,canvas.height);
    for(let i in particles){
        let part = particles[i];
        context.beginPath();
        context.arc(part.x, part.y, part.radius, 0, Math.PI*2);
        context.closePath();
        context.fillStyle = part.color;
        context.fill();
    }
}