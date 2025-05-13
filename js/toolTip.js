var toolTipExplaination;
var arrayToolTips;

function updateToolTips(){
    toolTipExplaination = document.getElementById("toolTipExplaination");
    var tmp_h6 = document.createElement("h6");
    tmp_h6.textContent = "(Hover over for Magic: the Gathering terminology meanings.)";
    toolTipExplaination.appendChild(tmp_h6);
    
    arrayToolTips = document.getElementsByClassName("toolTip");  
    toolTips_addEventListenerFunc();
}

function toolTips_addEventListenerFunc(){
  if(arrayToolTips.length > 0){
    console.log(arrayToolTips.length + " toolboxes found");
    for (var i = 0; i<arrayToolTips.length;i++){
      arrayToolTips[i].addEventListener("mouseover", showToolTip);
    }
  } else{
    console.log("no toolboxes found");
  }
}

function showToolTip(){
    console.log(this.title);    
}