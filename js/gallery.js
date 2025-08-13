/*
If at least one filter is on, the sketch will show
Have it so that when removing the show class, check to see if any of the other filters are currently on

*/

const SHOWCLASS = "show";
const GALLERYCLASSNAME = "gallerythumbnailBasic";

var baseFilters = ["creature","nonrandom","ramp","disruptionmass","disruptiontargeted","cardadvantage","land","artifact","enchantment","planeswalker","battle","instant","sorcery"];
var currentFilters = ["creature","nonrandom","ramp","disruptionmass","disruptiontargeted","cardadvantage","land","artifact","enchantment","planeswalker","battle","instant","sorcery"];

function checkGalleryItems(){
    //console.log("here");
    var tmpArt = document.getElementsByClassName(GALLERYCLASSNAME);
    var boolShow = false;
    for(var a = 0; a < tmpArt.length;a++){
        boolShow = false;
        var tmpClassList = tmpArt[a].className.split(" ");
        for(var b=0;b<tmpClassList.length;b++){
            if(currentFilters.includes(tmpClassList[b]) && !boolShow) boolShow = true; 
        }
        if(boolShow){
            if(!tmpClassList.includes(SHOWCLASS)){//if doesn't already have show
                
                w3AddClass(tmpArt[a], SHOWCLASS);   
            } //else, it already has show class
        } else{
            if(tmpClassList.includes(SHOWCLASS)){//if has show, then remove
                w3RemoveClass(tmpArt[a], SHOWCLASS);   
            } //else, it already has show class
        }        
        //console.log(tmpArt[a].className.split(" "));
    }
    intShowCount = document.getElementsByClassName(SHOWCLASS).length;
    btnShowAllFilter.disabled = intShowCount == maxShowCount;  
    btnClearAllFilter.disabled = intShowCount == 0;
    adjustShowCount();
}

function adjustShowCount(){
    divTextGalleryCount.innerHTML = "Currently displaying "+ intShowCount + "/" + maxShowCount + " sketches.";
}

var intShowCount = 0;
var maxShowCount = 0;

function filterSelection(btnClicked = null,c) {    
    if(btnClicked == null){//set up
        
    } else{    
        if (c == "none") { //reset
            currentFilters = [];
        } else if(c == "all") {
            currentFilters = [];
            for(var a=0;a<baseFilters.length;a++){
                currentFilters.push(baseFilters[a])
            }
        } else {
            if(btnClicked.classList.contains("active"))//it was in an active state
            {
                    const tmpClassIndex = currentFilters.indexOf(c);
                    if(tmpClassIndex > -1){
                        currentFilters.splice(tmpClassIndex,1);
                    //console.log("Turning " + c + " off");       
                    }
    
            } else{                        

                    const tmpClassIndex = currentFilters.indexOf(c);
                    if(tmpClassIndex < 0 ){
                        currentFilters.push(c);
                        //console.log("Turning " + c + " on");  
                    }                  
                    
                
            }
        }
       
    }
    checkGalleryItems();
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

var btnShowAllFilter;
var btnClearAllFilter;
var btns;
var showAllOn = true;
var intGalleryBtnMax = 0;
var intGalleryBtnActive = 0;
var divTextGalleryCount;

function onPageLoad_Gallery(){
    onPageLoad(true);
    document.getElementById("loadingImagesWarning").style.display = "none";
    // Add active class to the current button (highlight it)
    btnShowAllFilter = document.getElementById("filterShowAll");
    btnClearAllFilter = document.getElementById("filterClearAll");
    var btnContainer = document.getElementById("myBtnContainer");
    btns = btnContainer.getElementsByClassName("btn");
    //btnsActive = document.getElementsByClassName("active");
    intGalleryBtnMax = btns.length;
    divTextGalleryCount = document.getElementById("textGalleryCount");
    maxShowCount = document.getElementsByClassName(GALLERYCLASSNAME).length;
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(){
            if(this==btnShowAllFilter) 
            {   
                //btnShowAllFilter.disabled = true;
                //btnClearAllFilter.disabled = false;      
                    toggleShowAllOn();              
                /* 
                
                if(showAllOn){
                    toggleShowAllOff();
                    toClearAllFilter();
                }else{
                    toggleShowAllOn();                         
                }                       */
            } else if (this==btnClearAllFilter){
               // btnShowAllFilter.disabled = false;
                //btnClearAllFilter.disabled = true;  
                toggleShowAllOff();
                toClearAllFilter();
            } else{
                //toggleShowAllOff()
                var current = document.getElementsByClassName("active");     
                //console.log(current);
                //checks to see if the active class is on the current btn
                if(cs_includesHTMLElement(current,this)){
                    this.className = this.className.replace(" active", "");      
                    toggleShowAllOff()   
                } else{
                    this.className += " active";
                }
                checkShowAllShouldBeOn();                          
            }              
        });
    }
    filterSelection(null,"all") // Execute the function and show all columns

    //addGalleryPop Modal Specific
    var tmpThumbnailList = document.getElementsByClassName(GALLERYCLASSNAME);
    for(var tThumb = 0; tThumb < tmpThumbnailList.length;tThumb++){        
        //console.log(tThumb);
        //console.log(tmpThumbnailList[tThumb]);
        tmpThumbnailList[tThumb].addEventListener("click", function(){openGalleryItemInfo(this)});
    }

    //gallery specific Model:
    galleryInfo_cardname = document.getElementById(INFODIV_CARDNAME);
    galleryInfo_sketchDay = document.getElementById(INFODIV_SKETCHDAY);
    //galleryInfo_sketchDate = document.getElementById(INFODIV_SKETCHDATE);
    galleryInfo_OGartist = document.getElementById(INFODIV_OGARTIST);
    //galleryInfo_set = document.getElementById(INFODIV_SET);
    galleryInfo_scryfallLink = document.getElementById(INFODIV_SCRYFALLLINK);
    galleryInfo_sketchTime = document.getElementById(INFODIV_SKETCHTIME);
    galleryInfo_sketchimgfilename = document.getElementById(INFODIV_SKETCHIMGFILENAME);
    galleryInfo_digitalImgFileName = document.getElementById(INFODIV_DIGITALIMGFILENAME);
    //galleryInfo_landscapeOrPortrait = document.getElementById(INFODIV_LANDSCAPEORPORTRAIT);
    galleryInfo_filters = document.getElementById(INFODIV_FILTERS);

    span.addEventListener("click", closeModal);
}

var galleryInfo
var galleryInfo_cardname;

var galleryInfo_sketchDay;
var galleryInfo_sketchDate;
var galleryInfo_OGartist;
var galleryInfo_set;
var galleryInfo_scryfallLink;
var galleryInfo_sketchTime;
var galleryInfo_sketchimgfilename;
var galleryInfo_digitalImgFileName;
var galleryInfo_landscapeOrPortrait;
var galleryInfo_filters;

const INFODIV_CARDNAME = "gIcardname";
const INFODIV_SKETCHDAY = "gIsketchDay";
const INFODIV_SKETCHDATE = "gIsketchDate";//x
const INFODIV_OGARTIST = "gIOGartist";
const INFODIV_SET = "gIset";//x
const INFODIV_SCRYFALLLINK = "gIscryfallLink";
const INFODIV_SKETCHTIME = "gIsketchTime";
const INFODIV_SKETCHIMGFILENAME = "galleryPopUpImg";
const INFODIV_DIGITALIMGFILENAME = "gIdigitalImgFileName";
const INFODIV_LANDSCAPEORPORTRAIT = "gIlandscapeOrPortrait";//x
const INFODIV_FILTERS = "gIFilters";


const SKETCH_IMG_PATH = "../img/art/sketches/";
const GALLERY_DATA_CARDNAME = "data-cardname";
const GALLERY_DATA_SKETCHDAY = "data-sketchDay";
const GALLERY_DATA_SKETCHDATE = "data-sketchDate";
const GALLERY_DATA_OGARTIST = "data-OGartist";
const GALLERY_DATA_SET = "data-set";
const GALLERY_DATA_SCRYFALLLINK = "data-scryfallLink";
const GALLERY_DATA_SKETCHTIME = "data-sketchTime";
const GALLERY_DATA_SKETCHIMGFILENAME = "data-sketchimgfilename";
const GALLERY_DATA_DIGITALIMGFILENAME = "data-digitalImgFileName";
const GALLERY_DATA_LANDSCAPEORPORTRAIT = "data-landscapeOrPortrait";

const IMGCLASSPORTRAIT = "imgPortraitHelp";
const IMGCLASSLANDSCAPE = "imgLandscapeHelp";

const GALLERYTHUMBNAILID = "gallerythumbnailBasic";



//"creature","nonrandom","ramp","disruptionmass","disruptiontargeted","cardadvantage","land","artifact","enchantment","planeswalker","battle","instant","sorcery"
function openGalleryItemInfo(inpGalleryItem){
    //console.log(inpGalleryItem.getAttribute("data-cardname"));
    modal.style.display = "block";
    galleryInfo_cardname.innerHTML = inpGalleryItem.getAttribute(GALLERY_DATA_CARDNAME)+ " (" + inpGalleryItem.getAttribute(GALLERY_DATA_SET) + ")";
    galleryInfo_sketchimgfilename.src = SKETCH_IMG_PATH + inpGalleryItem.getAttribute(GALLERY_DATA_SKETCHIMGFILENAME);
    galleryInfo_sketchDay.innerHTML = "Day "+inpGalleryItem.getAttribute(GALLERY_DATA_SKETCHDAY) + " (" + inpGalleryItem.getAttribute(GALLERY_DATA_SKETCHDATE) + ")";
    galleryInfo_sketchTime.innerHTML = inpGalleryItem.getAttribute(GALLERY_DATA_SKETCHTIME) + " minutes"
    galleryInfo_OGartist.innerHTML = inpGalleryItem.getAttribute(GALLERY_DATA_OGARTIST);
    if(inpGalleryItem.getAttribute(GALLERY_DATA_DIGITALIMGFILENAME)!=""){
        galleryInfo_digitalImgFileName.innerHTML = "Completed";
    } else{
        galleryInfo_digitalImgFileName.innerHTML = "None";
    }
    if(inpGalleryItem.getAttribute(GALLERY_DATA_LANDSCAPEORPORTRAIT)=="l"){
        w3RemoveClass(galleryInfo_sketchimgfilename.parentNode,IMGCLASSPORTRAIT);
        w3AddClass(galleryInfo_sketchimgfilename.parentNode,IMGCLASSLANDSCAPE);
    } else{
        w3RemoveClass(galleryInfo_sketchimgfilename.parentNode,IMGCLASSLANDSCAPE);
        w3AddClass(galleryInfo_sketchimgfilename.parentNode,IMGCLASSPORTRAIT);
    }    
    var tmpClassList = inpGalleryItem.className.split(" ");
    galleryInfo_filters.innerHTML = "";//reset
    var tmpFilterList = "";
    for(var b=0;b<tmpClassList.length;b++){
        if(tmpClassList[b] != GALLERYTHUMBNAILID && tmpClassList[b] != "show"){            
            if(tmpFilterList!=""){
                tmpFilterList += ", "
            }
            switch(tmpClassList[b])
            {
                case "nonrandom":
                    tmpFilterList += "Non-Random";
                    break;
                case "disruptionmass":
                    tmpFilterList += "Disruption-Mass";
                    break;                
                case "disruptiontargeted":
                    tmpFilterList += "Disruption-Targeted";
                    break;                
                case "cardadvantage":
                    tmpFilterList += "Card-Advantage";
                    break;                
                default:
                    tmpFilterList += tmpClassList[b][0].toUpperCase() + tmpClassList[b].slice(1);
            }
        }
        
    }
    galleryInfo_filters.innerHTML = tmpFilterList;
    galleryInfo_scryfallLink.href = inpGalleryItem.getAttribute(GALLERY_DATA_SCRYFALLLINK)
    //console.log("//soro");
}


function toggleShowAllOn(){
    if(!showAllOn)
    {
        showAllOn = true;     
        toShowAllFilters();
    } 
}

function toClearAllFilter(){    
    for(var a = 2; a < intGalleryBtnMax; a++){
        try {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";    
        } catch (error) {
            //console.log(error);
        }
        
    }
}
function toShowAllFilters(){    
    var current = document.getElementsByClassName("active");
    for(var a = 2; a < intGalleryBtnMax; a++){
        if(!cs_includesHTMLElement(current,btns[a])){
            btns[a].className += " active";
        }
    }
    
}

function toggleShowAllOff(){
    if(showAllOn)
    {
        btnShowAllFilter.className = btnShowAllFilter.className.replace(" active", "");
        showAllOn = false;          
        btnShowAllFilter.innerHTML = "Show all filters";        
    }
}

function checkShowAllShouldBeOn(){
    intGalleryBtnActive = document.getElementsByClassName("active").length;
    //console.log(intGalleryBtnActive +"/"+intGalleryBtnMax);
    if(intGalleryBtnActive < intGalleryBtnMax-1){//ShowAll is a Button
        toggleShowAllOff();
    }else{
        toggleShowAllOn();
    }
}

//checks to see if the active class is on the current btn
function cs_includesHTMLElement(inp_Collection,inp_compare){
    var outBool = false;
    for(var a = 0; a < inp_Collection.length; a++){
        if(inp_Collection[a] == inp_compare) outBool = true;
    }
    //console.log(outBool);
    return outBool;
}