/*********** 588 VIRP Phrasings etc *************/
// ca_500 VIRP phrasing: of data in list and question
function ca_588_TextBits() {
    var textBits = {
        // text segments represenating data in circuit questions
        I: "<b>I</b>, the current in this branch",
        I0: "<b>I</b><sub>0</sub>, the total current in this branch",
        U: "<b>U</b>, the p.d. across this branch",
        P0: "<b>P</b>, the power dissipated in this branch",

        R1: "the resistance of <b>R</b><sub>1</sub>",
        I1: "<b>I</b><sub>1</sub>, the current in resistor <b>R</b><sub>1</sub>",
        V1: "<b>V</b><sub>1</sub>, the p.d. across resistor <b>R</b><sub>1</sub>",
        P1: "<b>P</b><sub>1</sub>, the power dissipated by resistor <b>R</b><sub>1</sub>",

        R2: "the resistance of <b>R</b><sub>2</sub>",
        I2: "<b>I</b><sub>2</sub>, the current in resistor <b>R</b><sub>2</sub>",
        V2: "<b>V</b><sub>2</sub>, the p.d. across resistor <b>R</b><sub>2</sub>",
        P2: "<b>P</b><sub>2</sub>, the power dissipated by resistor <b>R</b><sub>2</sub>",

        R3: "the resistance of <b>R</b><sub>3</sub>",
        I3: "<b>I</b><sub>3</sub>, the current in resistor <b>R</b><sub>3</sub>",
        V3: "<b>V</b><sub>3</sub>, the p.d. across resistor <b>R</b><sub>3</sub>",
        P3: "<b>P</b><sub>3</sub>, the power dissipated by resistor <b>R</b><sub>3</sub>"
    }
    return textBits;
}

// ca_500 VIRP units: symbol, name, sf/dp for answers
function ca_588_Units() {
    // units used in circuit questions
    var units = {
        I: ["mA", "<b>milli</b>amperes", 3],
        V: ["V", "volts", 3],
        P: ["W", "watts", 3],
        R: ["Ω", "ohms", 0],
    }
    return units;
}

// ca_500 VIRP display: data on diagrams or in lists
function ca_588_Display_Data({
  I0 = 1, V0 = 1, P0 = 1,
  R1 = 1, I1 = 1, V1 = 1, P1 = 1,
  R2 = 1, I2 = 1, V2 = 1, P2 = 1,
  R3 = 1, I3 = 1, V3 = 1, P3 = 1
} = {}, units) 
{
    var myObject = {
        I0: (I0 * 1000).toFixed(0) + " " + units.I[0],
        V0: V0.toPrecision(3) + " " + units.V[0],
        P0: P0.toPrecision(3) + " " + units.P[0],

        R1: R1 + " " + units.R[0],
        I1: (I1 * 1000).toFixed(0) + " " + units.I[0],
        V1: V1.toPrecision(3) + " " + units.V[0],
        P1: P1.toPrecision(3) + " " + units.P[0],

        R2: R2 + " " + units.R[0],
        I2: (I2 * 1000).toFixed(0) + " " + units.I[0],
        V2: V2.toPrecision(3) + " " + units.V[0],
        P2: P2.toPrecision(3) + " " + units.P[0],
        
        R3: R3 + " " + units.R[0],
        I3: (I3 * 1000).toFixed(0) + " " + units.I[0],
        V3: V3.toPrecision(3) + " " + units.V[0],
        P3: P3.toPrecision(3) + " " + units.P[0]
        
    };
    return myObject;
}