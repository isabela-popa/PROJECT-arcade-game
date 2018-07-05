// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = Math.floor((Math.random() * 150) + 50);
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

        // Check for enemy collision with the player
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 36 &&
            62 + player.y > this.y) {
            // Move player to initial position
            player.x = 202;
            player.y = 406;
        }

    }

    // Draw the enemy on the screen, required method for game
    render() {
        // @ts-ignore
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
    // @ts-ignore
    update(dt) {

    }

    // Draw the player on the screen
    render() {
        // @ts-ignore
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // when the player reaches the other side of the road, reset the game by moving the player back to the initial location
        if (this.y <= 0) {
            this.reset();
            // Print a win message on the screen
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(101, 134, 303, 333);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("You won!", 190, 200);
        }
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
    }

    // Move the player back to the initial location
    reset() {
        setTimeout(() => {
            this.x = 202;
            this.y = 406;
        }, 500);
    }
}

class Collectible {
    constructor(x, y) {
        // Variables applied to each of our instances
        // The position x and y of each collectible
        this.x = x;
        this.y = y;
        // The image/sprite for our collectible
        this.sprite = 'images/ct5r.png';
    }

    // Draw the collectible on the screen
    render() {
        // @ts-ignore
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Place all 15 carrots, one for each plain block that make up the road, in an array
let allCarrots = [];
// Set the y positions of the carrots
let carrotsPositionY = [133, 216, 299];
// Set all the x positions for the carrots
let carrotsPositionX = [0, 101, 202, 303, 404];

// Create all the carrots and set their x and y coordinates, then add them to allCarots array
carrotsPositionY.forEach(carrotsPositionY => {
    carrotsPositionX.forEach(carrotsPositionX => {
        let carrot = new Collectible(carrotsPositionX, carrotsPositionY);
        allCarrots.push(carrot);
    });
});

// PicK a random number of carrots between 1 and 5 to render on the screen
let amountCarrots = Math.floor(Math.random() * 5) + 1;
// Create an array where to place all the random carrots
let randomCarrots = [];
// Assign a random position for each of the random number of carrots and add them to randomCarrots array
for (let i = 0; i < amountCarrots; i++) {
    let randomPosition = allCarrots[Math.floor(Math.random() * 14)];
    randomCarrots.push(randomPosition);
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
