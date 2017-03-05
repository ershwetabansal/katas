class Bowling {

    constructor() {
        this.points = 0;
        this.totalRolls = 0;
        this.scoreBoard = [];
        this.currentFrame = [];
    }

    roll(pins) {
        this.validate(pins);

        if (this.isSpare()) {
            pins += pins;
        }

        this.points = this.points + pins;
        this.resetCurrentFrame();
        this.currentFrame.push(pins);
        this.updateScoreBoard();
        this.totalRolls ++;
        return true;
    }

    score() {
        return this.points;
    }

    totalFrames() {
        return Math.floor(this.totalRolls / 2);
    }

    resetCurrentFrame() {
        if (this.currentFrame.length === 2) {
            this.currentFrame = [];
        }
    }

    isGameOver() {
        return this.totalFrames() >= 10;
    }

    updateScoreBoard() {
        if (this.currentFrame.length === 2) {
            this.scoreBoard.push(this.currentFrame);
        }
    }

    isSpare() {
        if (this.currentFrame.length === 2) {
            return (this.currentFrame[0] + this.currentFrame[1]) === 10;
        }

        return false;
    }

    validate(pins) {
        if (this.isGameOver()) {
            throw new Error("Game over");
        }

        let leftOverPins = 10;
        if (this.currentFrame.length === 1 && this.currentFrame[0] !== 10) {
            leftOverPins -= this.currentFrame[0];
        }

        if (pins > leftOverPins) {
            throw new Error("Wrong input, only "+ leftOverPins +" pins can be knocked down.")
        }
        return true;
    }

    isStrike() {
        if (this.currentFrame.length === 2) {
            return (this.currentFrame[0] + this.currentFrame[1]) === 20;
        }

        return false;
    }
}