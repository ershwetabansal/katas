describe("Bowling game", function () {

    it("starts a new game", function () {
        let bowling = new Bowling();
        expect(bowling).toBeDefined();
    });

    it("scores zero on first roll", function () {
        let bowling = new Bowling();
        bowling.roll(0);
        expect(bowling.score()).toBe(0);
    });

    it("scores zero on two rolls", function () {
        let bowling = new Bowling();
        bowling.roll(0);
        bowling.roll(0);
        expect(bowling.score()).toBe(0);
    });

    it("scores zero on a full game of gutter balls", function () {
        let bowling = new Bowling();
        for (let i = 0; i < 20; ++i) {
            bowling.roll(0);
        }
        expect(bowling.score()).toBe(0);
    });

    it("scores two when hits 2 pins on first roll", function () {
        let bowling = new Bowling();
        bowling.roll(2);

        expect(bowling.score()).toBe(2);
    });

    it("scores two when hits 2 pin in first roll and 3 pin in second roll", function () {
        let bowling = new Bowling();
        bowling.roll(2);
        bowling.roll(3);

        expect(bowling.score()).toBe(5);
    });

    it("scores twenty in a game when knocks down one pin in each roll", function () {
        let bowling = new Bowling();
        let i;
        for (i = 1; i <= 20; i++) {
            bowling.roll(1);
        }
        expect(bowling.score()).toBe(20);
    });

    it("gives a frame number after a roll", function () {
        let bowling = new Bowling();
        bowling.roll(0);
        bowling.roll(0);

        expect(bowling.totalFrames()).toBe(1);

        bowling.roll(0);
        expect(bowling.totalFrames()).toBe(1);

        bowling.roll(0);
        expect(bowling.totalFrames()).toBe(2);
    });

    it("does not allow another roll when a game is over", function () {
        let bowling = new Bowling();
        let i;
        for (i = 1; i <= 20; i++) {
            bowling.roll(1);
        }
        expect(function () {
            bowling.roll(1);
        }).toThrowError("Game over");
    });

    it("tells game is over", function () {
        let bowling = new Bowling();
        expect(bowling.isGameOver()).toBeFalsy();
        for (let i = 1; i <= 20; i++) {
            bowling.roll(1);
        }

        expect(bowling.isGameOver()).toBeTruthy();
    });

    it("is a scoreboard", function () {
        let bowling = new Bowling();

        bowling.roll(1);
        bowling.roll(9);

        expect(bowling.scoreBoard instanceof Array).toBeTruthy();
        expect(bowling.scoreBoard).toContain([1, 9]);

    });

    it("awards a spare when knocks down all 10 balls in a spare", function () {
        let bowling = new Bowling();

        bowling.roll(1);
        bowling.roll(9);

        expect(bowling.isSpare()).toBeTruthy();
    });

    it("scores double (spare) in the next ball when knocks down 10 balls in first frame", function () {
       let bowling = new Bowling();
       bowling.roll(7);
       bowling.roll(3);
       bowling.roll(4);
       bowling.roll(2);

       expect(bowling.score()).toBe(20);
    });

    it("A spare in the first frame, followed by three pins, followed by all misses scores 16", function () {
        let bowling = new Bowling();

        bowling.roll(1);
        bowling.roll(9);
        bowling.roll(3);
        for (let i = 1; i <= 17; i++) {
            bowling.roll(0);
        }

        expect(bowling.score()).toBe(16);
    });
});