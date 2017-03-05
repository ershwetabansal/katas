class Bowling {

    constructor() {
        this.points = 0;
        this.totalRolls = 0;
    }

    roll(pins) {
        if (this.totalFrames() >= 10) {
            return false;
        }

        this.points = this.points + pins;
        this.totalRolls ++;
        return true;
    }

    score() {
        return this.points;
    }

    totalFrames() {
        return Math.floor(this.totalRolls / 2);
    }

}