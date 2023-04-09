import config from "../conf/index.js";

async function init() {
  console.log('From init()');
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try
  {
    let response=await fetch(`${config.backendEndpoint}/cities`);
    let cities=await response.json();
    return cities;
  }
  catch(err)
  {
    return null;
  }
}
//Implementation of DOM manipulation to add cities
function addclasses(element,classes)//objects(dom elements are objects)are pased by reference
{
  element.classList.add(...classes);
}
function addAtrributes(element,attributes)
{
  for(let [key,value] of Object.entries(attributes))
      element.setAttribute(key,value);
}
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div=document.querySelector('div.container>div.content>#data');
  let card=document.createElement('div');
  addAtrributes(card,{"id":id});
  addclasses(card,['col-12','col-sm-6','col-lg-3','mt-3']);
  let a=document.createElement('a');
  addAtrributes(a,{"href":`pages/adventures/?city=${id}`});
  let card_Content=document.createElement('div');
  addclasses(card_Content,['tile','d-flex','flex-column','justify-content-end','align-items-center']);
  let img=document.createElement('img');
  addAtrributes(img,{"src":image,"alt":city});
  addclasses(img,['img-fluid']);
  card_Content.appendChild(img);
  let text_Content=document.createElement('div');
  addclasses(text_Content,['tile-text','text-center']);
  text_Content.innerHTML=`<h5>${city}</h5>
                          <p>${description}</p>`;
  card_Content.appendChild(text_Content);
  a.appendChild(card_Content);
  card.appendChild(a);
  div.appendChild(card);
}

export { init, fetchCities, addCityToDOM };