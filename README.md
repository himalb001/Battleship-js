# Battleship State Tracker

### Background
Battleship is based on the classic game "Battleship". The code implements a state tracker for a single player.

### Prerequisite 

The code was created using node v10.16.0 on MacOS 10.16.2.

### Installation 

Battleship State tracker doesn't have an interface to run yet. The code can be verified by running unit tests.  


### Testing

Unit test are created using Mocha framework and Chai is used as the assertion library. You can validate the code using the unit tests provided. There are currently 28 unit tests testing both Board and ship classes. 

---

# Project Notes

### Project files and structure

The project contains 2 files

*	`Board.js`
* 	`Ship.js`

The board can be thought as a 2D grid and where ships are placed.

### Project Requirements

* **Create a board** - Board constructor allows to create a board with any number of rows and columns.
* **Add a battleship to the board** - `Board.addShip(Ship, Alignment)` function lets players add battleship to the board.
* **Take an “attack” at a given position** `Board.attackOnPosition(x,y)` allows players to take an attack on given position. The function returns a boolean indicating whether the attack was a Hit or a Miss.
* **Return whether the player has lost the game yet** `Board.areAllShipsSunk()` returns a boolean indicating whether all ships have sunk or not. This will indicate whether the player has lost the game or not.


### Technical notes

* For better scalability, a dictionary is used rather than a 2D grid array to represent the board.
* The code is broken down into multiple smaller unit testable function.
* Inline comments are used throughout the code in clean format.
* The code is very loosly coupled to support testability and extensibility.



