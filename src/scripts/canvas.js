const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 90;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};
canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 50; i++){
    particleArray.push(new Particle());
  }
  
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 1; i++){
    particleArray.push(new Particle());
  }
});

class Particle {
  constructor() { 
    this.x = mouse.x;
    this.y = mouse.y;
  
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5; 
    this.color = 'hsl(' + hue + ', 100%, 55%)';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 1, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) { 
    particleArray[i].update();
    particleArray[i].draw();
    for (let j=i; j < particleArray.length; j++){
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120){
        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = particleArray[i].color;
        ctx.moveTo(particleArray[i].x, particleArray[i].y)
        ctx.lineTo(particleArray[j].x, particleArray[j].y)
        ctx.stroke();
      }
    }
    if (particleArray[i].size <= 0.3){
      particleArray.splice(i, 1);
      i--;
    }
    
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
  // hue += 2;
}
animate();
