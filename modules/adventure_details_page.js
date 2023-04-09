import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
 let query=new URLSearchParams(search)
 let id=query.get('adventure');
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try
  {
    let response=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let json=await response.json();
    return json;
  }
  catch(e)
  {
    console.log(e);
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let heading=document.getElementById('adventure-name');
  heading.innerHTML=adventure.name;
  let subheading=document.getElementById('adventure-subtitle');
  subheading.innerHTML=adventure.subtitle;
  let gallery=document.getElementById('photo-gallery');
  for(let i of adventure.images)
  {
    gallery.innerHTML+=`<img src=${i} class="activity-card-image"/>`;
    console.log(i);
  }
  let content=document.getElementById('adventure-content');
  content.innerText=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery=document.getElementById('photo-gallery');
  gallery.innerHTML=`<div id="adventuregallery" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
</div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#adventuregallery" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#adventuregallery" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`;
let carouinner = document.getElementsByClassName("carousel-inner")[0];
let carouind = document.getElementsByClassName('carousel-indicators')[0];
for (let i = 0; i < images.length; i++) {
  if (i == 0) {
    carouind.innerHTML+=`<button type="button" data-bs-target="#adventuregallery" data-bs-slide-to=${i} class="active" aria-current="true" aria-label="Slide ${i+1}"></button>`;
    carouinner.innerHTML += `<div class="carousel-item active">
    <img src=${images[i]} class="d-block w-100">
  </div>`;
  } else {
    carouind.innerHTML+=`<button type="button" data-bs-target="#adventuregallery" data-bs-slide-to=${i}  aria-current="true" aria-label="Slide ${i+1}"></button>`;
    carouinner.innerHTML += `<div class="carousel-item">
    <img src=${images[i]} class="d-block w-100">
  </div>`;
  }
}
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldout=document.getElementById('reservation-panel-sold-out');
  let reserve=document.getElementById('reservation-panel-available');
  let reservationcost=document.getElementById('reservation-person-cost');
  if(adventure.available==true)
  {
    soldout.style.display='none';
    reserve.style.display='block';
    reservationcost.innerHTML=adventure.costPerHead;
  }
  else
  {
    soldout.style.display='block';
    reserve.style.display='none';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost=document.getElementById('reservation-cost');
  cost.innerHTML=adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form=document.getElementById('myForm');
  form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    let formdata = {};
    for(let e of event.target.elements){
      if(e.name) 
        formdata[e.name]=e.value;
    }
    formdata['adventure'] = adventure.id;
    console.log(formdata);
    try{
      let request={
        method : 'POST',
        body : JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*'
        },
      };
      let response=await fetch(`${config.backendEndpoint}/reservations/new`,request);
      let json=await response.json();
      if (!(response.status >= 200 && response.status <= 299))
        throw json.message;
      alert('Success!');
      location.reload();
    }
    catch(error)
    {
      console.log(error);
      alert('Failed!');
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservebanner=document.getElementById('reserved-banner');
  if(adventure.reserved==true)
  {
    reservebanner.style.display='block';
  }
  else
  {
    reservebanner.style.display='none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};