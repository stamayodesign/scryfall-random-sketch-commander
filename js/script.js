const currentSketchProgress = 71;
const currentCSPProgress = 4;
const currentFullCardProgress = 4;
const currentFullCardProgressText = "Current Full Card Progress: "+currentFullCardProgress+"%";
const lastUpdateTime = "10 May 2025 Saturday 20:07:11 EDT (UTC-04)"; //https://www.utctime.net/utc-to-edt-converter

// Init Variables
var modal;
//var img;
var modalImg;
var captionText;
var span;
var sketchesOnPage;

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

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  //img = document.getElementById("sketchDay69");
  modalImg = document.getElementById("img01");
  captionText = document.getElementById("caption");

  // Get the <span> element that closes the modal
  span = document.getElementsByClassName("close")[0];

  addEventListenerFunc();

  updateFullCardProgressText();
  updateLastUpdatedTime();
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