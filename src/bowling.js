class Bowling {

    constructor() {
        this.points = 0;
        this.totalRolls = 0;
        this.scoreBoard = [];
        this.currentFrame = [];
    }

    roll(pins) {
        if (this.isGameOver()) {
            throw new Error("Game over");
        }
        let currentPoints = pins;

        if (this.isSpare()) {
            currentPoints += pins;
        }

        this.points = this.points + currentPoints;
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

}