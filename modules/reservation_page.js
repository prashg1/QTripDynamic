import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try
  {
    let response=await fetch(`${config.backendEndpoint}/reservations/`);
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

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let tablebody=document.getElementById('reservation-table');
  if(reservations.length>0)
  {
    document.getElementById("reservation-table-parent").style.display='block';
    document.getElementById('no-reservation-banner').style.display='none';
  }
  else
  {
    document.getElementById("reservation-table-parent").style.display='none';
    document.getElementById('no-reservation-banner').style.display='block';
  };
    for(let i of reservations)
    {
      let reserdate=new Date(i.date).toLocaleDateString('en-IN');
      let time=new Date(i.time).toLocaleTimeString('en-IN');
      let bookdate=new Date(i.time).toLocaleDateString('en-IN',{ day: "numeric", year:"numeric", month:"long"});
      console.log(bookdate,time);
      tablebody.innerHTML+=`<tr>
                                <td>${i.adventure}</td>
                                <td>${i.name}</td>
                                <td>${i.adventureName}</td>
                                <td>${i.person}</td>
                                <td>${reserdate}</td>
                                <td>${i.price}</td>
                                <td>${bookdate}, ${time}</td>
                                <td><div id=${i.id}><a href=../detail/?adventure=${i.adventure}><button class="reservation-visit-button">Visit Adventure</button></a></div></td>
                            </tr>  `;
    }
  console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };