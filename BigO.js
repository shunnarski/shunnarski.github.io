


// clear the text area if the language is changed
var dropdown = document.getElementById("languageOption");
dropdown.onchange = function() {
    let codeInput = document.getElementById("codeInput");
    codeInput.value = "";
}

function displayBigOResult(resultShow, result) {
    resultShow.innerHTML = "";
    var resultH2 = document.createElement("h2");
    var text = "";
    for(var i = 0; i < result.length; i++) {
        var c = result[i];
        var c_type = checkAlphaNumeric(c);
        if(c_type == "var" || c == "(" || c == ")" || c == "1") {
            text += c;
        }
        else if(c_type == "num") {
            let sup = document.createElement("sup");
            let sup_txt = document.createTextNode(c);
            sup.appendChild(sup_txt);
            
            // create text node
            let text_node = document.createTextNode(text);
            resultH2.appendChild(text_node);
            text = "";

            resultH2.appendChild(sup);
        }
    }

    let text_node_final = document.createTextNode(text);
    resultH2.appendChild(text_node_final);

    resultShow.appendChild(resultH2);

}


// when button is clicked, gets the text from the text area:
var getBigOBtn = document.getElementById("getBigOBtn");
getBigOBtn.onclick = function() {
    var codeInput = document.getElementById("codeInput")
    var code = codeInput.value.trim();

    var codeAnalysis = document.getElementById("codeAnalysis");
    codeAnalysis.innerHTML = "";
    // now parse the text
    var result = parseInput(code, codeAnalysis);

    // set the result
    var resultShow = document.getElementById("resultShow");

    displayBigOResult(resultShow, result);
    
    // resultShow.innerHTML = result;
}

function displayForLineAnalysis(codeAnalysis, forLines, forLineEvals) {

    let h3 = document.createElement("h3");
    let h3Txt = document.createTextNode("Code Analysis:");
    h3.appendChild(h3Txt);
    codeAnalysis.appendChild(h3);


    for(var i = 0; i < forLines.length; i++) {
        let forLine = forLines[i]['line'].split("{")[0];
        let forLevel = forLines[i]['level'];
        let forLineEval = forLineEvals[i];

        let p = document.createElement("p");
        p.style.fontSize = "20px";

        let span_eval = document.createElement("span");
        span_eval.style.marginLeft = "40px";

        let evalTxt = document.createTextNode(forLineEval);
        span_eval.appendChild(evalTxt);

        let span_level = document.createElement("span");
        span_level.style.marginLeft = "40px";

        let levelTxt = document.createTextNode("Level: " + forLevel);
        span_level.appendChild(levelTxt);

        let forLineTxt = document.createTextNode(forLine);
        p.appendChild(forLineTxt);
        p.appendChild(span_eval);
        p.appendChild(span_level);

        codeAnalysis.appendChild(p);
    }
}


// this function should parse the input of the code and determine the big O notation
// params:
//  code: The code input
function parseInput(code, codeAnalysis) {
    // get the for statement
    let newlineSplit = code.split("\n")
    let forStatements = getForStatements(newlineSplit);
    let result = getBigONotation(forStatements);

    let finalBigO = result['final']
    let forLines = result['forLines'];
    let forLineEvals = result['forLineEvals']

    if(finalBigO && forLines && forLineEvals) {
        // display each for line evaluation:
        displayForLineAnalysis(codeAnalysis, forLines, forLineEvals);
    }

    return finalBigO;
}


