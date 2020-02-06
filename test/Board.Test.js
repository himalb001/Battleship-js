const expect = require('chai').expect;
const Board = require("../src/Board");
const Ship = require("../src/Ship")


describe("Board constructor", () => {

    it("should accept normal values", () => {
        // Smallest board
        expect(() => new Board(1, 1)).to.not.throw();

        // Medium board
        expect(() => new Board(10, 10)).to.not.throw();



        // Big board
        const board = new Board(100, 140)
        expect(() => board).to.not.throw();
        expect(board.verticalLength).to.equal(140);
    })


    
    it("should not accept negative lengths", () => {
        // Negative vertical length test
        expect(() => new Board(-1, 10)).to.throw();

        // Negative horizontal length test
        expect(() => new Board(1, -12)).to.throw();
    })


    it("should not accept 'string' argument", () => {
        // First argument test
        expect(() => new Board("a", 10)).to.throw();

        // First argument test
        expect(() => new Board(10, "a")).to.throw();

    })



    it("should round down floating vertical and horizontal length", () => {
        const board = new Board(10.9, 12.1);
        expect(board.horizontalLength).to.equal(10);
        expect(board.verticalLength).to.equal(12);
    })

})


describe("#addShip()", () => {
    it("should add a ship within bounds", () => {
        var board = new Board(20, 20);
        var ship = new Ship(11, 10, 5)
        board.addShip(ship, "VERTICAL");

        expect(board.hasShipAtCoordinate(11, 10)).to.be.true;
        expect(board.hasShipAtCoordinate(11, 14)).to.be.true;
        expect(board.hasShipAtCoordinate(11, 15)).to.be.false;
        expect(board.hasShipAtCoordinate(12, 10)).to.be.false;
    })

    it("Should not add NULL ship", () => {
        var board = new Board(20, 20);
        expect(board.addShip(null, "VERTICAL")).to.be.false;
    })

    it("should add a ship at bounds with length 1", () => {
        var board = new Board(10, 10);
        var ship = new Ship(10, 10, 1)

        expect(() => board.addShip(ship, "VERTICAL")).to.not.throw();
    })

    it("should ignore adding ship if it's out of bound", () => {
        var board = new Board(10, 10);
        var ship = new Ship(10, 10, 2)
        board.addShip(ship, "VERTICAL")
        expect(board.hasShipAtCoordinate(10, 10)).to.be.false;
    })


    it("should ignore adding ship is another ship exists on the coordinate", () => {
        var board = new Board(10, 10);
        var shipA = new Ship(5, 3, 5)
        var shipB = new Ship(3, 5, 5)
        // ShipA should be added as normal
        expect(board.addShip(shipA, "VERTICAL")).to.be.true;
        expect(board.addShip(shipB, "HORIZONTAL")).to.be.false;
        expect(board.hasShipAtCoordinate(3, 5)).to.be.false;
    })

    it("should not add ship coordinate bigger than board height", () => {
        var board = new Board(10, 10);
        var ship = new Ship(11, 11, 5);

        expect(board.addShip(ship, "VERTICAL")).to.be.false;

    })
})




describe("#hasShipAtCoordinate()", () => {

    it("should return true for the first element",()=>{
        const board = new Board(10, 10);
        const ship = new Ship(5,5,2);

        board.addShip(ship, "VERTICAL");
        expect(board.hasShipAtCoordinate(5,5)).to.be.true;
        
    })
    it("should return false for out of bound coordinate", () => {
        const board = new Board(10, 10);
        const ship = new Ship(9, 9, 1);

        board.addShip(ship, "VERTICAL");
        expect(board.hasShipAtCoordinate(11, 10)).to.be.false;
    })

    it("should return false after ship is destroyed", () => {
        const board = new Board(10, 10);
        const ship = new Ship(9, 9, 1);

        board.addShip(ship, "VERTICAL");
        
        board.attackOnPosition(9,9);

        expect(board.hasShipAtCoordinate(9,9)).to.be.false;
    })

})



describe("#attackOnPosition()", () => {

    it("Should notify if attack resulted in a HIT", () => {
        var board = new Board(20, 20);
        var ship = new Ship(10, 10, 9);

        board.addShip(ship, "VERTICAL");

        expect(board.attackOnPosition(10, 10)).to.be.true;
        expect(board.attackOnPosition(10, 11)).to.be.true;
        expect(board.attackOnPosition(10, 13)).to.be.true;
        expect(board.attackOnPosition(10, 18)).to.be.true;

    })



    it("Should notify if attack resulted in a MISS", () => {
        var board = new Board(20, 20);
        var ship = new Ship(10, 10, 9);

        board.addShip(ship, "VERTICAL");

        expect(board.attackOnPosition(10, 9)).to.be.false;
        expect(board.attackOnPosition(11, 10)).to.be.false;
        expect(board.attackOnPosition(10, 19)).to.be.false;
        expect(board.attackOnPosition(19, 18)).to.be.false;

    })

    it("Should ignore repeated attack on same coordinate", () => {
        var board = new Board(20, 20);
        var ship = new Ship(10, 10, 9);

        board.addShip(ship, "VERTICAL");

        expect(board.attackOnPosition(10, 10)).to.be.true;
        expect(board.attackOnPosition(10, 10)).to.be.false;
    })

    it("Negative numbers should be ignored ", () => {
        var board = new Board(20, 20);
        var ship = new Ship(10, 10, 9);

        board.addShip(ship, "VERTICAL");

        expect(board.attackOnPosition(-1, 10)).to.be.false;
    })

    it("should ignore negative numbers", () => {
        var board = new Board(20, 20);
        var ship = new Ship(10, 10, 9);

        board.addShip(ship, "VERTICAL");

        expect(board.attackOnPosition("abc", 10)).to.be.false;
    })

});


describe("#areAllShipsSunk",()=>{
    // normal case
    it("should return true when all ships are sunk",()=>{
        var board = new Board(20, 20);
        var shipA = new Ship(10, 10, 2); 
        var shipB = new Ship(11, 11, 1); 
        
        board.addShip(shipA, "VERTICAL");
        board.addShip(shipB, "HORIZONTAL");

        // ships are in [10,10] , [10,11] and [11,11]
        board.attackOnPosition(10,10);
        expect(board.areAllShipsSunk()).to.be.false;

        board.attackOnPosition(10, 11);
        expect(board.areAllShipsSunk()).to.be.false;

        board.attackOnPosition(11, 11);
        expect(board.areAllShipsSunk()).to.be.true;

    })

    it("should return false when no ships are added", () => {
        const board = new Board(20, 20);
        expect(board.areAllShipsSunk()).to.be.false;
    })
})


describe("#canShipBePlaced()", ()=>{
    it("should place ship with normal coordinates and length", ()=>{
        const board = new Board(20, 20);
        const ship = new Ship(10,10,5);

        expect(board.canShipBePlaced(ship,"VERTICAL")).to.be.true;

    })

    it("should not place ship with out of bound coordinates", ()=>{
        const board = new Board(20, 20);
        const ship = new Ship(21, 21, 5);

        expect(board.canShipBePlaced(ship, "VERTICAL")).to.be.false;
    })

    it ("should not place ship with normal coordinates and out of bound length", ()=>{
        const board = new Board(20, 20);
        const ship = new Ship(10, 10, 20);

        expect(board.canShipBePlaced(ship, "VERTICAL")).to.be.false;
    })

    it("should not add ship is another ship exist on it's path",()=>{
        const board = new Board(20, 20);
        const shipA = new Ship(10, 10, 5);
        const shipB = new Ship(10, 10, 5);

        expect(board.addShip(shipA, "VERTICAL")).to.be.true;
        expect(board.canShipBePlaced(shipB, "VERTICAL")).to.be.false;
    })
    
})