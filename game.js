const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game variables
const gravity = 0.2;
const jump = -5 ;
const pipeGap = 175;
const pipeWidth = 70;
const pipeSpeed = 1.5;

let isGameOver = false;
let gameMessage = ""; // Variable to store the game message

// Bird class
class Bird {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 27;
        this.color = color;
        this.velocity = 0;
        this.dead = false;
    }

    update() {
        this.velocity += gravity;
        this.y += this.velocity;
    }

    flap() {
        this.velocity = jump;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.dead ? 'white' : this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 0;
        this.dead = false;
    }
}

// Pipe class
class Pipe {
    constructor(x) {
        this.x = x;
        this.top = Math.random() * (canvas.height / 2);
        this.bottom = this.top + pipeGap;
        this.width = pipeWidth;
        this.scored = false;
    }

    update() {
        this.x -= pipeSpeed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
            this.top = Math.random() * (canvas.height / 2);
            this.bottom = this.top + pipeGap;
            this.scored = false;
        }
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, this.bottom, this.width, canvas.height - this.bottom);
    }

    collides(bird) {
        return (
            bird.x + bird.radius > this.x &&
            bird.x - bird.radius < this.x + this.width &&
            (bird.y - bird.radius < this.top || bird.y + bird.radius > this.bottom)
        );
    }
}

// Game setup
let player, aiBird, pipes;

function initializeGame() {
    player = new Bird(150, canvas.height / 2, 'yellow');
    aiBird = new Bird(150, canvas.height / 2, 'red');
    pipes = [new Pipe(canvas.width), new Pipe(canvas.width + canvas.width / 2)];
    isGameOver = false;
    gameMessage = ""; // Reset the game message
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        player.flap();
    }
});

// Improved AI decision making
function aiLogic() {
    const nextPipe = pipes.find(pipe => pipe.x + pipe.width > aiBird.x);
    if (nextPipe) {
        const gapCenter = (nextPipe.top + nextPipe.bottom) / 2;

        if (aiBird.y > gapCenter + 20) {
            aiBird.flap();
        } else if (aiBird.y < gapCenter - 20 && aiBird.velocity > 0) {
            aiBird.velocity = Math.min(aiBird.velocity, 0.5);
        } else if (aiBird.y < gapCenter && aiBird.velocity < 0) {
            aiBird.velocity += gravity;
        }
    }
}

// Game loop
function gameLoop() {
    if (isGameOver) {
        setTimeout(() => {
            initializeGame();
            requestAnimationFrame(gameLoop);
        }, 1000);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pipes.forEach(pipe => {
        pipe.update();
        pipe.draw();

        // Check for collisions with the player bird
        if (pipe.collides(player) || player.y + player.radius > canvas.height || player.y - player.radius < 0) {
            isGameOver = true;
            gameMessage = "AI Wins!"; // Set message when player loses
        }

        // Check for collisions with the AI bird
        if (pipe.collides(aiBird) || aiBird.y + aiBird.radius > canvas.height || aiBird.y - aiBird.radius < 0) {
            aiBird.dead = true;
            aiBird.reset(aiBird.x, canvas.height / 2);
            isGameOver = true; 
            gameMessage = "You Win!"; // Set message when AI dies
        }
    });

    player.update();
    player.draw();
    aiLogic();
    aiBird.update();
    aiBird.draw();

    // Display game message
    if (isGameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Arial'; // Increased font size
        const textWidth = ctx.measureText(gameMessage).width;
        ctx.fillText(gameMessage, (canvas.width / 2) - textWidth / 2 + 20, canvas.height / 2); // Moved left by 50 pixels
    }

    requestAnimationFrame(gameLoop);
}

// Initialize game when page loads
initializeGame();
gameLoop();