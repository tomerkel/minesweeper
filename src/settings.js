function udpateValue(label){
    let slider = document.getElementById(label+"Range");
    let output = document.getElementById(label+"Value");
    output.innerHTML = slider.value;

    if (label !== 'mines'){
        var height = document.getElementById("heightRange");
        var width = document.getElementById("widthRange");
        var maxValue = (height.value-1)*(width.value-1)
        var mines = document.getElementById("minesRange");
        mines.setAttribute("max", maxValue);
        if (maxValue <= mines.value){
            let outputMines = document.getElementById("minesValue");
            outputMines.innerHTML = maxValue;
        }
        
    }
}

