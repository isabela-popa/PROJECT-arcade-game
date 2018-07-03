// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = Math.floor((Math.random() * 230) + 50);
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/blue-f1-car.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -200;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        // Variables applied to each of our instances
        this.x = 202;
        this.y = 406;
        // The image/sprite for our player
        this.sprite = 'images/white-rabbit.png';
    }

    // Update the player's position
    update(dt) {

    }

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handleInput() method
    handleInput(keyPress) {
        // If user presses the "Up arrow" key and the player's position is inside the screen, the player moves up one block
        if (keyPress === 'up' && this.y > 0) {
            this.y -= 83;
        }

        // If user presses the "Down arrow" key and the player's position is less than it's initial position, the player moves down one block
        if (keyPress === 'down' && this.y < 406) {
            this.y += 83;
        }

        // When user presses the "Left arrow" key and the player's position is inside the screen, the player moves left one block
        if (keyPress === 'left' && this.x > 0) {
            this.x -= 101;
        }

        // When user presses the "Right arrow" key and it's position is greater than one step needed to move, the player moves right one block
        if (keyPress === 'right' && this.x < 404) {
            this.x += 101;
        }

        // when the player reaches the other side of the road, reset the game by moving the player back to the initial location
        if (this.y <= 0) {
            this.reset();
        }
    }

    // Move the player back to the initial location
    reset() {
        setTimeout(() => {
            this.x = 202;
            this.y = 406;
        }, 500);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Create the enemies and add them to allEnemies array
let enemiesPositionY = [62, 62, 145, 145, 228, 228, 228];
enemiesPositionY.forEach(enemyPositionY => {
    let enemy = new Enemy(-200, enemyPositionY);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
