/*********** GENERIC mdl Functions ****************/
/*
* contains
* mdl_svg_sizeMe: resizes SVG
* mdl_ca_divTxt: fills 3 divs(top, mid, bottom) with text
* mdl_ca_arrayFltr: selects question constelation
*/
/*********** SVG RESIZE *************/
function mdl_svg_sizeMe(svg, box, {} = {}) {
    var bBox = box.bbox();
    var vBox = bBox.x + " " + bBox.y + " " + bBox.width + " " + bBox.height;
    svg.viewbox(vBox); // svg.js: viewbox; d3: viewBox
}

/*********** DIV TXT FILL *************/
/*
 * mdl_ca_Text2 populates <div>'s with stem, data, and question
 * assumes 3 text divs: top (intro), mid (data), bottom (question)
 * tdm_qtext is overal container (parent), containing
 * * tdm_qtext1: top <p> (100% wide)
 * * tdm_qtext2: mid <p> (50% wide, to the left of a dgrm)
 * * tdm_qtext3: bottom <p> (100% wide, before 'Answer' field)
 */
function mdl_ca_divTxt( me, {
        stems = [],
        data = [],
        question = "",
        units = "",
        sigfig = ""
    } = {}) 
{
    // find parent continer (usually <div>)
    // tdm_qtext is overal container
    // tdm_qtext1: top <div>, 100% wide
    // tdm_qtext2: mid <div>, 50% wide, to the left of a dgrm
    // tdm_qtext3: bottom <div>, 100% wide, before 'Answer' field
    var parent = me.closest(".tdm_qtext"),
        child_1 = parent.querySelector(".tdm_qtext_1"),
        child_2 = parent.querySelector(".tdm_qtext_2"),
        child_3 = parent.querySelector(".tdm_qtext_3");

    // create stem containers: 2 before data list, optional 3rd after
    var paragraphs = stems.map(function(e, i, a) {
        var p = document.createElement("p");
        p.innerHTML = e;
        return p;
    });

    // create list, question, and 'Express your answer in' unit containers
    var parL = document.createElement("ul"),

        // attached to calcualted answer, so can be hard coded
        parQ = document.createElement("p"),
        parU = document.createElement("p");

    // create data list
    for (i = 0; i < data.length; i++) {
        parL.innerHTML += "<li>" + data[i] + "</li> ";
    }

    // create question_text: question + unit
    parQ.innerHTML = "Determine the value of " + question + ".";

    var txtEnd = "";

    if (sigfig) {
        txtEnd = ", to " + sigfig + "</i>";
    } else {
        txtEnd = ".</i>";
    }

    parU.innerHTML = "<i>Express your answer in " + units + txtEnd;

    // add to DOM ...
    // ... stem 1 and 2 / top
    child_1.appendChild(paragraphs[0]);

    // ... list / middle
    child_2.appendChild(paragraphs[1]);
    child_2.appendChild(parL);

    // ... stem 3 / bottom
    if (paragraphs[2]) {
        child_3.appendChild(paragraphs[2]);
    }

    // ... question and unit
    if (question) child_3.appendChild(parQ);
    if (units) child_3.appendChild(parU);
}

/*********** OPTION SELECT *************/
/* 
 * masterFilter:
 * Given relevant array, 
 * filter by level and question ('asked'),
 * normalize option (%= array.length),
 * return nth (=option) constelation of 'shown' variables.
 *
 * Assumes [[shown], level, asked]
 * Returns [shown]
 */
function mdl_ca_arrayFltr(arr, level, asked, option = 0) {

  // ioslate constelations matching level and asked
    var tempArray = arr.filter(function(e) {
        return e[1] == level && e[2] == asked;
    });

    // handle out-of-range option index
    option %= tempArray.length;

  // chose which constalation to use as 'sown'
  // i.e. send chosen [shown] further on
    return tempArray[option][0];
}