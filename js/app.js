const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;

const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;

const COLLISTION_WIDTH = CELL_WIDTH * 0.6;
const COLLISTION_HEIGHT = CELL_HEIGHT * 0.6;

const MOVE_LEFT = 37;
const MOVE_UP = 38;
const MOVE_RIGHT = 39;
const MOVE_DOWN = 40;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.moveToStartPoint();
};

Enemy.prototype.moveToStartPoint = function() {
    this.x = (Math.floor(Math.random() * 5) + 1) * - CELL_WIDTH;
    this.y = (Math.floor(Math.random() * 3) + 1) * CELL_HEIGHT - 20;
    this.speed = 50 + (Math.floor(Math.random() * 20) + 1) * 10;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollisions();
    this.x = this.x + this.speed * dt;
    if (this.x > CANVAS_WIDTH) {
        this.moveToStartPoint();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
    if (this.x - COLLISTION_WIDTH < player.x && player.x < this.x + COLLISTION_WIDTH
        && this.y - COLLISTION_HEIGHT < player.y && player.y < this.y + COLLISTION_HEIGHT) {
        player.moveToStartPoint();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.moveToStartPoint();
};

Player.prototype.moveToStartPoint = function() {
    this.x = 2 * CELL_WIDTH;
    this.y = 5 * CELL_HEIGHT - 10;
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    switch (input) {
        case MOVE_LEFT:
            if (this.x > 0) {
                this.x = this.x - CELL_WIDTH;
            }
            break;
        case MOVE_UP:
            if (this.y > 0) {
                this.y = this.y - CELL_HEIGHT;
            }
            break;
        case MOVE_RIGHT:
            if (this.x < CANVAS_WIDTH - CELL_WIDTH) {
                this.x = this.x + CELL_WIDTH;
            }
            break;
        case MOVE_DOWN:
            if (this.y < 5 * CELL_HEIGHT - 10) {
                this.y = this.y + CELL_HEIGHT;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    player.handleInput(e.keyCode);
});
