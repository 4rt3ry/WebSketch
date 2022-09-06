Math.constrain = (value, min, max) => value < min ? min : value > max ? max : value;
Math.map = (value, min, max, newMin, newMax) => (value - min) / (max - min) * (newMax - newMin) + newMin;
Math.rad2deg = (angle) => 57.29577951 * angle;
Math.deg2rad = (angle) => 0.017453292 * angle;

function main(s) {
    let bg;// Background div
    let env = {};

    let invisible, red, blue, green, yellow;

    let noiseX = 0, noiseY = 0; // So noise values don't reset every loop

    let seed = 23;// The Noise Seed - Good values: 23, 3265, 0

    s.setup = function () {
        // Environment setup
        bg = document.getElementById("bg");
        env.w = 390;
        env.h = 1215;

        // Color setup
        invisible = s.color(1, 0, 0, 0);
        red = s.color(200, 50, 50);
        green = s.color(70, 200, 110);
        blue = s.color(50, 100, 200);
        yellow = s.color(200, 200, 50)

        let c = s.createCanvas(env.w, env.h);
        c.parent(bg);

        // Background setup
        console.log(r);
        s.background(0);
        s.fill(0);
        s.noStroke();
    }

    s.draw = function () {
        //This is where any procedurally generated backgrounds will be called
        point();
        s.noLoop();
    }

    /**
     * 
     * @param {number} x Center X
     * @param {number} y Center Y
     * @param {*} c Color
     * @param {*} r Radius
     */
    function point(x, y, c, r) {
        s.fill(c);
        s.ellipse(x, y, r, r);
    }

};

let myP5 = new p5(main);