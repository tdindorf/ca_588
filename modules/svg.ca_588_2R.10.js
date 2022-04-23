/*********** 588 VIRP 2R functions *************/

/*
 * family: qtype, [json_array_2R, json_array_2RD, json_array_2R_notD, json_array_2R_P]
 * series (1) or parallel (0)
 * data: from Moodle, e.g. [{I}, {R1}, {R2}]
 * L: level (0-8?); 
 ** [Level 0 = K's law, addition/subtraction only **
 * Q: what is asked for (0-8) [I/U, U/I, P0], [R1, V/I1, P1], [R2, V/I2, P2]
 * option: which constelation, limited via %=
 */
export function ca_588_2R_opts(me, {family = 0, series = true, data = [], L = 1, Q = 0, opt = 0} = {}) {
    //var permutations = ca_arrays_588(family);
    //var shown = ca_masterFilter(ca_arrays_500(family), L, Q, opt);
    //data.push(shown);
    data.push(mdl_ca_arrayFltr(ca_588_2R_arrays(family), L, Q, opt));
    data.push(Q);
    ca_588_2R_parse(me, data, series);
}

/*
 * ca_588_2R_parse: construct question text & diagram based on data and option
 * data [I/U0, R1, R2, [show_1, show_2, show_3], ask_for]
 * series: 1 (default), parallel 2/false
 */
export function ca_588_2R_parse(me, data, series = true) {
  var units = [],  allVals = [], textBits = [], dgrmDefs = [], dgrmAsked = [], dgrmShow = [];
  
  var oU = ca_588_Units(),
      oT = ca_588_TextBits();
  
  var R1 = data[1] * 1,
      R2 = data[2] * 1,
      show = data[3],
      ask_for = data[4];
  
  // determine all values (I012, V012, P012)
  if (series){
    var I0 = data[0] * 1,
            
        V1 = R1 * I0,
        V2 = R2 * I0,
        V0 = V1 + V2,
        
        P1 = R1 * I0 ** 2,
        P2 = R2 * I0 ** 2,
        P0 = P1 + P2,
        
        I1 = I0,
        I2 = I0;

  } else {
    var V0 = data[0] * 1,
        
        I1 = V0 / R1,
        I2 = V0 / R2,
        I0 = I1 + I2,

        P1 = V0 ** 2 / R1,
        P2 = V0 ** 2 / R2,
        P0 = P1 + P2,

        V1 = V0,
        V2 = V0;
  }

    // ******** DGRM VALUES ****************
    // parse all diagram values
    var obData = {
            I0: I0, V0: V0, P0: P0,
            R1: R1, I1: I1, V1: V1, P1: P1,
            R2: R2, I2: I2, V2: V2, P2: P2
        };
  
   var oS = ca_588_Display_Data(obData, oU);
  
  // specific
  
  if (series) {
    units = [oU.I, oU.V, oU.P, oU.R, oU.V, oU.P, oU.R, oU.V, oU.P],
      allVals = [oS.I0, oS.V0, oS.P0, oS.R1, oS.V1, oS.P1, oS.R2, oS.V2, oS.P2],
      textBits = [oT.I, oT.U, oT.P0, oT.R1, oT.V1, oT.P1, oT.R2, oT.V2, oT.P2],
      dgrmDefs = ["", "+ U", "", "", "", "", "", "", ""],
      dgrmAsked = ["I", "U", "P", "", "V₁", "P₁", "", "V₂", "P₂"];
  } else {
    units = [oU.V, oU.I, oU.P, oU.R, oU.I, oU.P, oU.R, oU.I, oU.P],
        allVals = [oS.V0, oS.I0, oS.P0, oS.R1, oS.I1, oS.P1, oS.R2, oS.I2, oS.P2],
        textBits = [oT.U, oT.I, oT.P0, oT.R1, oT.I1, oT.P1, oT.R2, oT.I2, oT.P2],
        dgrmDefs = ["+ U", "", "", "", "", "", "", "", ""],
        dgrmAsked = ["U", "I", "P", "", "I₁", "P₁", "", "I₂", "P₂"];
  }
   
       // ... if given as data
        // generic
        dgrmShow = dgrmAsked.map(function(e, i) {
            // all symbol + value except R
            return e.length ? e + ' = ' + allVals[i] : allVals[i];
        })

    // ************* end of diagram defaults ********
    //***********************************************

    //************ add shown values *****************
    for (i = 0; i < show.length; i++) {
        dgrmDefs[show[i]] = dgrmShow[show[i]];
    }

    //************* replace asked_for value ************
    dgrmDefs[ask_for] = dgrmAsked[ask_for] + " = ?";
  
  var dgrData = {
        P0: dgrmDefs[2],
        R1: dgrmDefs[3],
        P1: dgrmDefs[5],
        R2: dgrmDefs[6],
        P2: dgrmDefs[8]
  }
  
  if (series) {
    dgrData.I0 = dgrmDefs[0],
    dgrData.V0 = dgrmDefs[1],
    dgrData.V1 = dgrmDefs[4],
    dgrData.V2 = dgrmDefs[7];
  } else {
    dgrData.V0 = dgrmDefs[0],
    dgrData.I0 = dgrmDefs[1],
    dgrData.I1 = dgrmDefs[4],
    dgrData.I2 = dgrmDefs[7];
  }
  
    // ********** END of DIAGRAM data *****************
    //*************************************************

    //************************************************
    // ******** TEXT VALUES ****************
    // prepare text elements
    var stems = [
        // 1st sentence, before data
      "The diagram shows a branch of a circuit containing two resistors, " +
      "<b>R</b>₁ and <b>R</b>₂, connected in " + 
      (series ? "series." : "parallel."),

        // 2nd sentence, before data
        "The following values are known:",
    ];

    // list values: expand to complete "The following are known: __" + value + unit
    var textData = [];
    for (i = 0; i < show.length; i++) {
        textData.push(
            textBits[show[i]] + " = " + allVals[show[i]]);
    }

    // ask for unknown value: 
    // completes "Determine ___; Express your answer in ___"
    var textQ = textBits[ask_for];
    var unitQ = units[ask_for][1];
    var sigfig = units[ask_for][2] ? units[ask_for][2]  + ' s.f.': "";
    // end of text parsing

    //****************************************
    // call diagram drawing function
      dgrData.series = series
      ca_588_2R_draw(me, dgrData);
  
    // call text insert function
  // generic
    mdl_ca_divTxt(me, {
        stems: stems,
        data: textData,
        question: textQ,
        units: unitQ,
        sigfig: sigfig
    });
}

/*
 * ca_588_2R_draw(me, dgrData)
 * relies on svg.js
 * options for series or parallel
*/
export function ca_588_2R_draw(me, {
    R1 = "",
    V1 = "",
    I1 = "",
    P1 = "",
    
    R2 = "",
    V2 = "",
    I2 = "",
    P2 = "",
    
    I0 = "",
    V0 = "+ U",
    P0 = "",
    
    series =  true
} = {})
{

  // arrays using RVIP 012 order
  // instead of using eval() later
  var arR  = ["", R1, R2],
      arV = [V0, V1, V2],
      arI = [I0, I1, I2],
      arP = [P0, P1, P2];
  
    //********default values for optional parameters
    // ******** USING SVG.js SYNTAX ************
    var svg = SVG(me),
    defs = svg.defs(),
    makers = defs.group(),
    box = svg.group();
    
    //******************************************
    
    var strStyle =
    "svg { fill: none; border: solid #00f 1px; padding: 2%; margin: 0 5% 0 10%; font: 0.8em sans-serif; text-anchor: middle } text.shadow { stroke: #fff; stroke-width: .25em } .wire { stroke: grey } circle.origin { stroke: #000; --r: 2 } rect.res { stroke: brown; fill: #fff } path.vlt { stroke: #00f; fill: none } path.cur { stroke: red; fill: none } text.res { fill: brown } text.cur { fill: red } text.vlt { fill: #00f } text.pow { fill: green } .start { text-anchor: start } .end { text-anchor: end }"
    
    svg.element("style").words(strStyle);
    //*********** DEFINITIONS ******************
    
    //*********** DEF: MARKERS ******************
    var rad = 3;
    var origin = makers
    .marker(20, 20, function(z) {
        z
        .circle(2 * rad)
        .addClass("origin")
        .x(rad)
        .y(rad);
    })
    .ref(2 * rad, 2 * rad);
    
    var arrow_end = makers
    .marker(10, 8, function(z) {
        z.path("M 0 0 L 10 4 0 8 z");
    })
    .ref(10, 4);
    
    //*********** DEF: ELEMENTS ******************
    // resistor box
    var resistor = defs.group();
    resistor
    .rect(24, 60)
    .center(0, 0)
    .addClass("res");
    
    // p.d. brace, vertical
    var V_short = defs.group();
    V_short.path("M -5 -35 l 5 5 v 25 l 5 5 -5 5 v 25 l -5 5").addClass("vlt");
    
    // current arrow, vertical
    var I_short = defs.group();
    I_short.path("M 0 -10 v 20")
    .marker(
        "end",
        arrow_end
        .clone()
        .stroke("red")
        .fill("red")
    )
    .addClass("cur");
    
    //*********** END of DEFS ******************
    //******************************************
    
    // positions of resistors [x,y]: center = 0,0
    var pos = series ? [
        [0, 0],
        [0, -1],
        [0, 1]
        ] : [
        [0, -1.25],
        [0, 1],
        [1, 1]
    ]
    
    // px scaling factor for positions
    var scale = 50;
    
    //*********** STATIC ELEMENTS ******************
    var circuit = box.group();
    
    // basic vertical wire path
    var pathSeries = "M -50 -100 h 50 v 200 h -50";
    
    // parallel branch, if needed
    var pathBranch = "M 0 -25 h 50 v 125 h -50";
    
    circuit
    .path(pathSeries)
    .addClass("wire")
    .marker("start", origin.clone().fill("red"))
    .marker("end", origin.clone().fill("aqua"));
    
    // if parallel, add branch
    if (!series){
        circuit.path(pathBranch).addClass("wire")
    }
    
    // emf applied
    circuit
    .plain("0 V")
    .cy(100)
    .x(-60)
    .addClass("vlt end");
    
    circuit
    .plain(V0)
    .cy(-100)
    .x(-60)
    .addClass("vlt end");
    
    //******************************************
    //*********** DATA-bound GROUP *************
    
    // create data-bound groups
    var components = circuit.group();
    
    // add components 0, 1, 2
    for (var i = 0; i < 3; i++) {
        if (series) {
            var V = arV[i]; //eval("V" + i);
            } else {
            var I = arI[i]; //eval("I" + i);
        }
        
        var P = arP[i]; //eval("P" + i);
        
        var elem = components.group().center(pos[i][0] * scale, pos[i][1] * scale);
        
        if (i > 0) {
            var res = elem.group();
            res.use(resistor);
            // resistor label, always
            res
            .plain("R" + i)
            .cy(0)
            .addClass("res");
            
            // resistor value, if present
            // move label, not entire box
            // res.plain(eval("R" + i))
            if(series) {
                res
                .plain(arR[i]).cy(0) //.plain(eval("R" + i)).cy(0)
                .x(20)
                .addClass("res start");
                } else {
                res
                .plain(arR[i]).cy(-10) //.plain(eval("R" + i)).cy(-10)
                .x(i == 1 ? -20 : 20)
                .addClass("res")
                .addClass(i == 1 ? 'end' : 'start');
            }
            
        }
        
        if (V) {
            if (i == 0) {
                // do nothing
                } else {
                var pot = elem.group().x(60);
                pot.use(V_short);
                pot
                .plain(V)
                .x(15)
                .cy(0)
                .addClass("vlt start");
            }
        }
        
        if (I) {
            var cur = elem.group().cy(i ? -50 : 0);
            cur.use(I_short);
            cur
            .plain(I)
            .x(i == 1 ? -10 : 10)
            .cy(0)
            .addClass("cur")
            .addClass(i == 1 ? 'end' : 'start');
        }
        
        if (P) {
            if (series) {
                elem
                .plain(P)
                .cy(0)
                .x(-25)
                .addClass("pow end");
                } else {
                elem
                .plain(P)
                .cy(i ? 15 : -35)
                .x(i == 1 ? -20 : 20)
                .addClass("pow")
                .addClass(i == 1 ? 'end' : 'start');
            }
        }
        
        if (series) {
            if (!i && I0) {
                var cur = elem.group();
                cur.use(I_short);
                cur
                .plain(I0)
                .cy(0)
                .x(15)
                .addClass("cur start");
            }
        }
    }
    
    mdl_svg_sizeMe(svg, box);
}
