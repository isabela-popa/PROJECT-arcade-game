# Classic Arcade Game Clone Project

## Introduction

The Classic Arcade Game Clone project recreates the classic arcade game Frogger and it is built using HTML, CSS Object-Oriented JavaScript and HTML5 Canvas. It uses ES6 **object-oriented** class functions (like Player and Enemy).

### Functionality

In this game you have a Player (rabbit) and Enemies (F1 race cars). The goal of the player is to reach the other side of the road, without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the plain block portion of the scene. Once the player collides with an enemy, the player moves back to the start square and loses 1 life. Once the player reaches the other side of the road the player receives 1 life. The game is reset when there are no lives left.

In addition, there have been added collectibles (carrots) to the game, allowing the player to collect them.

There is a score implemented for the game, which consists of three elements:

* number of **lives** that increases by 1 each time the player reaches the other side of the road and it is reduced by 1 when collision occurs. Every game starts with a default of 3 lives;
* number of **carrots** collected by the player. Try to collect as many carrots as you can to increase you points.
* **points** gathered as a result of collecting the carrots. Every carrot collected is worth 50 points.

## How to run
* To get started, open the game found at the following link https://isabela-popa.github.io/PROJECT-arcade-game/;

## How to play

* Use the Up, Down, Left and Right arrow keys to move the player (rabbit);

* Try to cross the road without colliding with the enemies (F1 race car);

* If you collide with an enemy, the player will be moved back to it's original location and it loses 1 life. You can continue crossing the road as long as you have any lives left;

* When you get to the other side of the road,the player gets 1 life, which will be added to the 3 default lives already existing on the score panel. Also, the player is moved back to it's original position, from where you can start over crossing the road;

* On you way to the other side of the road, you can collect carrots from the road. After you collected the first round of carrots, there will appear anothers set of carrots and so on. The more you collect, the higher the score is;

* The game lasts as long as you have lives. Once the lives equal 0, a game over message is displayed on the screen. You can press the Enter key to start a new game.

## Feedback

This game was build as one of the projects needed to be completed in the Udacity FEND Nanodrgree Program.
Any suggestions of improvement would be appreciated.