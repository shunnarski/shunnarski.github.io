


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
    
    // now parse the text
    var result = parseInput(code)

    // set the result
    var resultShow = document.getElementById("resultShow");

    displayBigOResult(resultShow, result);
    
    // resultShow.innerHTML = result;
}


// this function should parse the input of the code and determine the big O notation
// params:
//  code: The code input
function parseInput(code) {
    // get the for statement
    let newlineSplit = code.split("\n")
    let forStatements = getForStatements(newlineSplit);
    let result = getBigONotation(forStatements);
    return result;
}


