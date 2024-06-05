//initiate get location
const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
navigator.geolocation.getCurrentPosition(success, error, options);

//callbacks for success and error
function success({ coords }) {
  const { latitude, longitude } = coords;
  getWeather(latitude, longitude);
}
function error(error) {
  console.log("Error", error);
}

//go get the weather data from the api
async function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`;

  //get data and turn into object, two lectures about this world to come
  let result = await fetch(url);
  result = await result.json();

  console.log(result.city, result.list);
}
