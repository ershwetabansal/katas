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

    it("is over", function () {
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

    it("has only 10 pins to knock down", function () {
        let bowling = new Bowling();

        expect(function () {
            bowling.roll(11)
        }).toThrowError("Wrong input, only 10 pins can be knocked down.");
    });

    it("awards a spare when knocks down all 10 balls in one frame", function () {
        let bowling = new Bowling();

        bowling.roll(0);
        bowling.roll(0);
        expect(bowling.isSpare()).toBeFalsy();

        bowling.roll(1);
        bowling.roll(9);
        expect(bowling.isSpare()).toBeTruthy();

        bowling.roll(2);
        bowling.roll(4);
        expect(bowling.isSpare()).toBeFalsy();

        bowling.roll(10);
        bowling.roll(10);
        expect(bowling.isSpare()).toBeFalsy();

        bowling.roll(2);
        expect(function () {
            bowling.roll(10)
        }).toThrowError("Wrong input, only 8 pins can be knocked down.");
    });

    it("scores double (spare) in the next ball when knocks down 10 balls in first frame", function () {
       let bowling = new Bowling();
       bowling.roll(7);
       bowling.roll(3);
       bowling.roll(4);
       bowling.roll(2);

       expect(bowling.score()).toBe(20);
    });

    it("scores 16, when a spare is in the first frame, followed by three pins, followed by all misses", function () {
        let bowling = new Bowling();

        bowling.roll(1);
        bowling.roll(9);
        bowling.roll(3);
        for (let i = 1; i <= 17; i++) {
            bowling.roll(0);
        }

        expect(bowling.score()).toBe(16);
    });


    it("scores 24, A strike in the first frame, followed by three and then four pins, followed by all misses", function () {

    });
});