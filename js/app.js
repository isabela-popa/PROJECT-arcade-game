// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // provided this.sprite for us to get started
        this.x = x;
        this.y = y;
        this.speed = Math.floor((Math.random() * 150) + 50);
        // The image/sprite for our enemies, this uses
        // a helper provided to easily load images
        this.sprite = 'images/blue-f1-car.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // We should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -300;
        }

        // Check for enemy collision with the player
        // Collision detection from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 36 &&
            62 + player.y > this.y) {
            // Move player to initial position
            player.x = 202;
            player.y = 406;
            // Decrease the number of player's lives by 1
            player.lives -= 1;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        // @ts-ignore
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Write our own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        // Variables applied to each of our instances
        this.x = 202;
        this.y = 406;
        // The image/sprite for our player
        this.sprite = 'images/white-rabbit.png';
        this.points = 0;
        this.carrots = 0;
        this.lives = 3;
    }

    // Update the player's position
    // @ts-ignore
    update(dt) {

    }

    // Draw the player on the screen
    render() {
        // @ts-ignore
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // Add a score board on top of the screen, which keeps the number of carrots collected, points gathered and lives of the player
        // @ts-ignore
        ctx.font = "20px Verdana";
        // @ts-ignore
        ctx.fillText(`Lives: ${this.lives}`, 10, 37);
        // @ts-ignore
        ctx.fillText(`Carrots: ${this.carrots}`, 327, 17);
        // @ts-ignore
        ctx.fillText(`Points: ${this.points}`, 340, 37);

        // Print a game over message on the screen
        if (this.lives === 0) {
            // @ts-ignore
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            // @ts-ignore
            ctx.fillRect(50, 92, 404, 415);
            // @ts-ignore
            ctx.font = '32px Tahoma';
            // @ts-ignore
            ctx.fillStyle = '#fff';
            // @ts-ignore
            ctx.fillText('Game over!', 170, 200);
            // @ts-ignore
            ctx.font = '24px Tahoma';
            // @ts-ignore
            ctx.fillText(`You scored ${this.points} points!`, 140, 270);
            // @ts-ignore
            ctx.fillText(`Press Enter to start a new game.`, 80, 320);

            // Prevent the player to be moved after the game over message appeares
            document.removeEventListener('keyup', handleMoveKeys);

            // Listen for key presses related to popup and sends the key to Player.handleInput() method
            document.addEventListener('keyup', handlePopupKeys);
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

        // when the player reaches the other side of the road, reset the game by moving the player back to the initial location and increase the lives by 1
        if (this.y <= 0) {
            this.resetPlayer();
            this.lives += 1;
        }

        // When the game over popup is opened and the user presses the Enter key, start a new game
        if (keyPress === 'enter') {
            startGame();
        }
    }

    // Move the player back to the initial location
    resetPlayer() {
        this.x = 202;
        this.y = 406;
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

    // @ts-ignore
    update(dt) {
        // Check for carrot collision with the player
        for (let i = 0; i < randomCarrots.length; i++) {
            // The numbers in the condition below represent the width and height of the collision area of the two characters
            if (player.x < randomCarrots[i].x + 40 &&
                player.x + 40 > randomCarrots[i].x &&
                player.y < randomCarrots[i].y + 3 &&
                3 + player.y > randomCarrots[i].y) {
                // Collect carrot by removing it from the randomCarrots array and therefore from the screen
                randomCarrots.splice(i, 1);
                // For every carrot collected, increase the score of carrots by 1 and the score of points by 50
                player.carrots += 1;
                player.points += 50;

                // updatescore
            }
        }
    }
}

// Place all 15 carrots, one for each plain block that make up the road, in an array
let allCarrots = [];
// Set the y positions of the carrots
let carrotsPositionY = [72, 155, 238];
// Set all the x positions for the carrots
let carrotsPositionX = [0, 101, 202, 303, 404];

// Create all the carrots and set their x and y coordinates, then add them to allCarots array
carrotsPositionY.forEach(carrotsPositionY => {
    carrotsPositionX.forEach(carrotsPositionX => {
        let carrot = new Collectible(carrotsPositionX, carrotsPositionY);
        allCarrots.push(carrot);
    });
});

// Create an array where to place all the random carrots
let randomCarrots = [];

// After all the first carrots are collected, wait 3 seconds and then create new ones
let newCarrot = setInterval(() => {
    if (randomCarrots.length === 0) {
        // Create new carrots
        createNewCarrots();
    }
}, 3000);

// Create new carrots
function createNewCarrots() {
    // PicK a random number of carrots between 1 and 5 to render on the screen
    let amountCarrots = Math.floor(Math.random() * 5) + 1;
    // Assign a random position for each of the random number of carrots and add them to randomCarrots array
    for (let i = 0; i < amountCarrots; i++) {
        let randomPosition = allCarrots[Math.floor(Math.random() * 14)];
        randomCarrots.push(randomPosition);
    }
}

// Instantiate our objects
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Create the enemies and add them to allEnemies array
let enemiesPositionY = [62, 62, 145, 145, 228, 228, 228];

// Place the player object in a variable called player
let player;

function startGame() {
    // Reset the randomCarrots array;
    randomCarrots = [];
    // The setInterval will start after the first round of carrots are collected
    let firstRender = true;
    // Create carrots for the first time
    if (firstRender) {
        // Create new carrots
        createNewCarrots();
        firstRender = false;
    }

    // Reset the allEnemies array
    allEnemies = [];
    // Create the enemies and add them to allEnemies array
    enemiesPositionY.forEach(enemyPositionY => {
        let enemy = new Enemy(-200, enemyPositionY);
        allEnemies.push(enemy);
    });

    // Place the player object in a variable called player
    player = new Player();

    // Remove event listener for key presses related to popup
    document.removeEventListener('keyup', handlePopupKeys);

    // This listens for key presses and sends the keys to
    // Player.handleInput() method.
    document.addEventListener('keyup', handleMoveKeys);
};

// This listens for key presses and sends the keys to
// Player.handleInput() method.
function handleMoveKeys(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// Add the keys allowed to press by the user when the game over popup is opened
function handlePopupKeys(e) {
    var allowedKeys = {
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// Start game for the first time
startGame();