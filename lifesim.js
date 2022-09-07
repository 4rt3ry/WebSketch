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

    let cellData = {
        blue: { count: 0, color: 0, attraction: {}, list: [] },
        red: { count: 0, color: 0, attraction: {}, list: [] },
        green: { count: 0, color: 0, attraction: {}, list: [] },
        yellow: { count: 0, color: 0, attraction: {}, list: [] },
    }

    let cellList = []

    s.setup = function () {
        // Environment setup
        bg = document.getElementById("bg");
        env.w = 390;
        env.h = 1215;

        // Color setup
        invisible = s.color(1, 0, 0, 0);
        red = s.color(200, 50, 50);
        green = s.color(70, 200, 110);
        blue = s.color(80, 150, 255);
        yellow = s.color(200, 200, 50)

        let c = s.createCanvas(env.w, env.h);
        c.parent(bg);

        // Background setup
        s.background(0);
        s.fill(0);
        s.noStroke();

        cellSetup();
        generateCells();
        displayCells();
    }

    s.draw = function () {
        //This is where any procedurally generated backgrounds will be called

        s.noLoop();
    }

    /**
     * Must be called before other cell functions
     */
    function cellSetup() {
        cellColor("blue", blue);
        cellColor("red", red);
        cellColor("green", green);
        cellColor("yellow", yellow);

        cellCount("blue", 200);
        cellCount("red", 50);
    }

    function cellCount(cell, num) { cellData[cell].count = num }

    function cellColor(cell, color) { cellData[cell].color = color }

    function rule(src, dst, force) { cellData[src].attraction[dst] = force }

    function randomTransform() {
        return {
            x: Math.random() * env.w,
            y: Math.random() * env.h,
            xv: 0,
            yv: 0,
            xa: 0,
            ya: 0
        }
    }

    function generateCells() {
        for (let cellType in cellData) {
            console.log(cellType)
            for (let i = 0; i < cellData[cellType].count; i++) {
                cellData[cellType].list.push(randomTransform())
            }
        }
    }

    function updteCells() {
        // Iterate through each cell type's list of cells
        Object.values(cellData).forEach(cellType => {
            
            // Interactions between own cell type
            for (let srcI = 0; srcI < cellType.count; srcI++) {
                for(let dstI = 0; dstI < cellType.count; dstI++) {
                    if (srcI == dstI) continue;

                    // TODO: apply gravitational forces between each cell
                }
            }
        })
    }

    function displayCells() {
        // Iterate through each cell type's list of cells
        Object.values(cellData).forEach(cellType => {
            let color = cellType.color;

            // Display each individual cell
            cellType.list.forEach(cell => {
                console.log(cell)
                point(cell.x, cell.y, color, 3);
            })
        })
    }

    /**
     * Draws a filled circle
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