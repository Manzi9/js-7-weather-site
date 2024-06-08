//initiate get location
const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
navigator.geolocation.getCurrentPosition(success, error, options);

const rootRef = document.getElementById("root");

//callbacks for success and error
function success({ coords }) {
  const { latitude, longitude } = coords;
  getweatherURL(latitude, longitude);
}
function error(error) {
  console.log("Error", error);
}

//go get the weather data from the api

async function getweatherURL(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=025d6d7082992c91d55137fa52f388c1`;
  console.log(url);

  //get data and turn into object, two lectures about this world to come
  let result = await fetch(url);
  result = await result.json();

  //Layout
  displayWeatherInfo(result);

  console.log(result); //what's the difference between result.city and weather Array?!
}
function displayWeatherInfo(weatherArr) {
  rootRef.append(generateHTML("h1", `Weather in ${weatherArr.city.name}`));
  for (let i = 0; i < weatherArr.list.length; i++) {
    rootRef.append(generateHTML("h2", "Thursday"));
    rootRef.append(
      generateHTML("p", Math.round(weatherArr.list[i].main.temp - 273.15) + "C")
      // How to add degrees? &deg; doesn't work.
    );
    rootRef.append(
      generateHTML("p", weatherArr.list[i].weather[0].description)
    );
  }
}
// Data on site
// document.getElementById("root").innerHTML = "Bob,"; //shouldn't do it this way.

function generateHTML(tag, text) {
  let _text = document.createTextNode(text);
  let _elem = document.createElement(tag);
  _elem.append(_text);

  return _elem;
}
