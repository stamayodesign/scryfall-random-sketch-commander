const currentSketchProgress = 122;
// Days 78 and 99 have 2 sketches each
const currentCSPProgress = 8;
const currentFullCardProgress = 9;
const currentFullCardProgressText = "Current Full Card Progress: "+currentFullCardProgress+"%";
//https://www.utctime.net/utc-to-edt-converter
const lastUpdateTime = "27 June 2025 Friday 19:14:21 EDT (UTC-04)"; 
const postPageMax = 10;
//consider pagination
const bufferZone = 3; 
const cradleZone = 1 ;//Math.floor(bufferZone/2);
//1-3:  <<|<|1|2|3|4|5|...|10|>|>>
//4:    <<|<|1|...|3|4|5|...|10|>|>>
//5:    <<|<|1|...|4|5|6|...|10|>|>>
//6:    <<|<|1|...|5|6|7|...|10|>|>>
//7:    <<|<|1|...|6|7|8|...|10|>|>>
//8-10: <<|<|1|...|6|7|8|9|10|>|>>

// Init Variables
var modal;
//var img;
var modalImg;
var captionText;
var span;
var sketchesOnPage;
// postPageNav 1,2,3,...,Last
var postPageNav;
var metaPageNumber;
var currentPageNum;

function addEventListenerFunc(){
  if(sketchesOnPage.length > 0){
    for (var i = 0; i<sketchesOnPage.length;i++){
      sketchesOnPage[i].addEventListener("click", openModal);
    }
  }
  //img.addEventListener("click", openModal);
  span.addEventListener("click", closeModal);
}

function openModal(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  console.log("//soro");
}
function closeModal(){
  modal.style.display = "none";  
}

function onPageLoad(){
  //Assign Variables
  // Get the modal
  modal = document.getElementById("pageModal");

  sketchesOnPage = document.getElementsByClassName("sketchImage");  

  postPageNav = document.getElementById("postPageNav");
  meta = document.getElementsByTagName("meta");
  for (var i = 0; i<meta.length;i++){
    console.log(meta[i]);
    if(meta[i].name=="postPage" && !isNaN(meta[i].content)){
      currentPageNum = parseInt(meta[i].content);
      updatePageNav();
    }
  }

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  //img = document.getElementById("sketchDay69");
  modalImg = document.getElementById("img01");
  captionText = document.getElementById("caption");

  // Get the <span> element that closes the modal
  span = document.getElementsByClassName("close")[0];

  addEventListenerFunc();

  updateFullCardProgressText();
  updateLastUpdatedTime();

  //Tool Tip
  try{
    updateToolTips()
  } catch(error){
    console.log(error);
  }
}

function goToNextPage(){
  if(currentPageNum == postPageMax){
    console.error("Already at Last Page.");
    return;
  } 
  console.log("Next Page");
  gotoPostPage((currentPageNum+1));
}

function goToPrevPage(){
  if(currentPageNum == 1){
    console.error("Already at First Page.");
    return;
  }
  console.log("Previous Page");
  gotoPostPage((currentPageNum-1));
}

function gotoPostPage(inpPage){
  //console.log(inpPage);return;
  var tmp_error = null;
  if(isNaN(inpPage)){
    tmp_error = "No Page Number Received."    
  }
  if(inpPage == 1){//Should only be able to go here from non-index page
    window.location = "../index.html";
  } else{
    try{
      if(currentPageNum == 1){//Get into the folder first.
        window.location = "html/page"+inpPage+".html";
      }else{
        window.location = "page"+inpPage+".html";
      }
    } catch(error){
      tmp_error=error;
    }
  }
  if(tmp_error != null) console.error(tmp_error);
}

function updatePageNav(){
  //Right Nav
  if(postPageMax != currentPageNum){
    var tmp_rightArrow = document.createElement('button');
    tmp_rightArrow.textContent = ">";
    tmp_rightArrow.addEventListener("click",goToNextPage);
    postPageNav.prepend(tmp_rightArrow);
  }
  for(q=postPageMax;q>0;q--){
    var tmp_pageNumber = document.createElement('button');
    tmp_pageNumber.textContent = q;
    console.log(currentPageNum);
    if(currentPageNum == q){
      tmp_pageNumber.disabled = true;
      tmp_pageNumber.classList.add("noHover");
      postPageNav.prepend(tmp_pageNumber);
    } else{
      tmp_pageNumber.value = q;
      tmp_pageNumber.addEventListener("click",event=>{
        //console.log(event.srcElement.value);
        gotoPostPage(event.srcElement.value);
      });
      postPageNav.prepend(tmp_pageNumber);
    }      
  }     

  //Left Nav  
  if(currentPageNum != 1){
    var tmp_leftArrow = document.createElement('button');
    tmp_leftArrow.textContent = "<";
    tmp_leftArrow.addEventListener("click",goToPrevPage);
    postPageNav.prepend(tmp_leftArrow);
  }
  
  /*
    //If this is not the last page, add the right arrow.
  if(postPageMax != currentPageNum){
    var tmp_rightArrow = document.createElement('span');
    tmp_rightArrow.textContent = ">";
    postPageNav.prepend(tmp_rightArrow);
  }
  for(q=postPageMax;q>0;q--){
    console.log(q);
    if(currentPageNum == q){
      var tmp_p = document.createElement('span');
      tmp_p.textContent = q;
      postPageNav.prepend(tmp_p);
    } else{
      var tmp_a = document.createElement('a');
      var linkText = q;
      tmp_a.append(linkText);
      if(q==1){
        tmp_a.href = "../index.html";
      }else{
        tmp_a.href = "../html/page"+q+".html";
      }      
      postPageNav.prepend(tmp_a);
    }      
  }      
  
  var tmp_pageSpan = document.createElement('span');
  tmp_pageSpan.textContent = "Page: ";
  postPageNav.prepend(tmp_pageSpan);
  */
}


function updateFullCardProgressText(){
  document.getElementById("divCurrentFullCardProgressBar").style.width = (currentFullCardProgress+"%");
  document.getElementById("divCurrentFullCardProgressText").textContent = currentFullCardProgressText;
  document.getElementById("tdCurrentProgressSketchText").textContent = currentSketchProgress;
  document.getElementById("tdCurrentProgressCSPText").textContent = currentCSPProgress;
  console.log("//soro");
}

function updateLastUpdatedTime(){
  document.getElementById("divFooterLastUpdated").textContent = "Last Updated: "+lastUpdateTime;
}

function updateSideBar(){
  //TODO
}