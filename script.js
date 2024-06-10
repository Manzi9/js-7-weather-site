//--------------------------------------------------------------------
//initiate get location
//--------------------------------------------------------------------
const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
navigator.geolocation.getCurrentPosition(success, error, options);

const rootRef = document.getElementById("root");
//--------------------------------------------------------------------
//callbacks for success and error
//--------------------------------------------------------------------
function success({ coords }) {
  const { latitude, longitude } = coords;
  getweatherURL(latitude, longitude);
}
function error(error) {
  console.log("Error", error);
}

//--------------------------------------------------------------------
//go get the weather data from the api
//--------------------------------------------------------------------
async function getweatherURL(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=025d6d7082992c91d55137fa52f388c1`;
  console.log(url);

  //get data and turn into object,
  let result = await fetch(url);
  result = await result.json();

  //Layout
  displayWeatherInfo(result);

  console.log(result); //what's the difference between result.city and weather Array?!
}
//--------------------------------------------------------------------
//UPDATE INTERFACE
//--------------------------------------------------------------------
function displayWeatherInfo(weatherArr) {
  rootRef.append(generateHTML("h1", `Weather in ${weatherArr.city.name}`));
  for (let i = 0; i < weatherArr.list.length; i++) {
    let unixTime = weatherArr.list[i].dt * 1000;
    let date = new Date(unixTime); //Can I remove the timezone details?

    rootRef.append(generateHTML("h2", date));
    rootRef.append(
      generateHTML("p", Math.round(weatherArr.list[i].main.temp - 273.15) + "C")
      // How to add degrees? &deg; doesn't work.
    );
    rootRef.append(
      generateHTML("p", weatherArr.list[i].weather[0].description)
    );

    // rootRef.append(generateHTML("img", weatherArr.list[i].weather[0].icon));
    //
  }
}
// Data on site
// document.getElementById("root").innerHTML = "Bob,"; //shouldn't do it this way.

//--------------------------------------------------------------------
//Writes HTML
//--------------------------------------------------------------------
function generateHTML(tag, text) {
  let _text = document.createTextNode(text); //Why does the order of text/elem variables matter?
  let _elem = document.createElement(tag);
  // let _image = document.createElement(image);
  _elem.append(_text);

  return _elem;
}

// const form = document.getElementById("form");
// const city = document.getElementById("query");
// const google = "https://www.google.com/search?q=site%3A+";
// const site = "pagedart.com";

// function submitted(event) {
//   event.preventDefault();
//   const url = google + site + "+" + city.value;
//   const win = window.open(url, "_blank");
//   win.focus();
// }

// form.addEventListener("submit", submitted);

//--------------------------------------------------------------------
//SEARCH BAR
//--------------------------------------------------------------------
const form = document.getElementById("form");
const city = document.getElementById(query.value);
const searchBTN = document.getElementById("SearchBTN");

function searchForCity(city) {
  const searchURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=025d6d7082992c91d55137fa52f388c1`;
  console.log(searchURL);
}
form.addEventListener("submit", searchForCity);
// searchBTN.addEventListener("click", function (e) {
//   searchForCity(city);
// });
