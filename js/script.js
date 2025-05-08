
const currentFullCardProgress = 2;
const currentFullCardProgressText = "Current Full Card Progress: "+currentFullCardProgress+"%";
const lastUpdateTime = "7 May 2025 Wednesday 20:22:30 EDT (UTC-04)"; //https://www.utctime.net/utc-to-edt-converter

function updateFullCardProgressText(){
  document.getElementById("divCurrentFullCardProgressBar").style.width = (currentFullCardProgress+"%");
  document.getElementById("divCurrentFullCardProgressText").textContent = currentFullCardProgressText;
  console.log("//soro");
  updateLastUpdatedTime();
}

function updateLastUpdatedTime(){
  document.getElementById("divFooterLastUpdated").textContent = "Last Updated: "+lastUpdateTime;
}

function updateSideBar(){
  //TODO
}