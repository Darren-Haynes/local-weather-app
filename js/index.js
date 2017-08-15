function toggleTemperature(f, c) {
  var content = $('#temp').html();
  var isFahrenheit = content.includes('F');
  var tempColor = '<span style="color:#0D4D8C">';
  if (isFahrenheit === true) {
    return c + '&deg;' + tempColor + ' C</span>';
  } else {
    return f + '&deg;' + tempColor + ' F</span>';
  }
}

function tempHTML(temp) {
  return temp + '&deg;' + '<span style="color:#0D4D8C"> F</span>';
}

function isDay(icon) {
  return icon.endsWith('d');
}

function getBackground(icon) {
  if (isDay(icon) === true) {
    var background = {
      //"background": "url('https://s19.postimg.org/6038gth3n/gold_gradient_simple.jpg') no-repeat",
      //"background-size": "cover",
      //"color": "maroon"
      "background": "#87e0fd",
      "background": "-moz-linear-gradient(-45deg, #87e0fd 0%, #53cbf1 40%, #05abe0 100%) fixed",
      "background": "-webkit-linear-gradient(-45deg, #87e0fd 0%,#53cbf1 40%,#05abe0 100%) fixed",
      "background": "linear-gradient(135deg, #87e0fd 0%,#53cbf1 40%,#05abe0 100%) fixed",
      "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#87e0fd', endColorstr='#05abe0',GradientType=1 )",
      "color": "black"
    };
    return background;
  } else {
    var background = {
      "background": "#45484d",
      /* Old browsers */
      "background": "-moz-linear-gradient(-45deg, #45484d 0%, #000000 100%) fixed",
      /* FF3.6-15 */
      "background": "-webkit-linear-gradient(-45deg, #45484d 0%,#000000 100%) fixed",
      /* Chrome10-25,Safari5.1-6 */
      "background": "linear-gradient(135deg, #45484d 0%,#000000 100%) fixed",
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=1 )",
      /* IE6-9 fallback on horizontal gradient */
      "color": "silver"
    };
    return background;
  }

}

function infoHTML(city, country, weather) {

  var cityInfo = '<h3>' + city + ', ';
  var countryInfo = country + '</h3>';
  return cityInfo + countryInfo;
}

function getIcon(icon) {
  var iconMapping = {
    '01d': 'https://s19.postimg.org/c9fo1h61f/weezle_sun.png',
    '01n': 'https://s19.postimg.org/h5epffgsz/weezle_fullmoon.png',
    '02d': 'https://s19.postimg.org/f4sr8ca1f/weezle_sun_minimal_clouds.png',
    '02n': 'https://s19.postimg.org/8bnsybtub/weezle_moon_cloud.png',
    '03d': 'https://s19.postimg.org/46hhq5lg3/weezle_sun_most_cloudy.png',
    '03n': 'https://s19.postimg.org/dbl969zgz/weezle_moon_cloud_medium.png',
    '04d': 'https://s19.postimg.org/m95z3mrwz/weezle_overcast.png',
    '04n': 'https://s19.postimg.org/m95z3mrwz/weezle_overcast.png',
    '09d': 'https://s19.postimg.org/c0i3bjt8z/weezle_sun_and_rain.png',
    '09n': 'https://s19.postimg.org/ncq3flck3/weezle_night_rain.png',
    '10d': 'https://s19.postimg.org/wyjnvw3pv/weezle_rain.png',
    '10n': 'https://s19.postimg.org/wyjnvw3pv/weezle_rain.png',
    '11d': 'https://s19.postimg.org/496fa3vf7/weezle_sun_thunder_rain.png',
    '11n': 'https://s19.postimg.org/rojaic8ur/weezle_night_thunder_rain.png',
    '13d': 'https://s19.postimg.org/4n7r9pfir/weezle_sun_and_snow.png',
    '13n': 'https://s19.postimg.org/4ocn60b0z/weezle_much_snow.png',
    '50d': 'https://s19.postimg.org/acnzu0loz/weezle_fog.png',
    '50n': 'https://s19.postimg.org/t64qtwdlf/weezle_night_fog.png',
  };
  return "<img src='" + iconMapping[icon] + "'>";
}

function getCoords(callback) {
  $.getJSON('http://ip-api.com/json', function(location) {
    var lat = (location.lat);
    var lon = (location.lon);
    var coords = [lat, lon];
    callback(coords);
  });
}

function makeWeatherAPIUrl(fn) {
  getCoords(function(coords) {
    var apiPrefix = "https://api.openweathermap.org/data/2.5/weather?";
    var apiCoords = "lat=" + coords[0] + "&" + "lon=" + coords[1];
    var apiKey = "&APPID=" + "06518ca6c7b51fe98c0e54ac77d55e64";
    var apiUrl = apiPrefix + apiCoords + apiKey;
    fn(apiUrl);
  });
}

$(document).ready(function() {
  makeWeatherAPIUrl(function(url) {
    $.getJSON(url, function(weather) {

      // set required weather json data to clear variable names
      city = weather.name;
      country = weather.sys.country;
      weatherType = weather.weather[0].description;
      icon = getIcon(weather.weather[0].icon);
      celsius = Math.round(weather.main.temp - 273.15);
      fahrenheit = Math.round(1.8 * (weather.main.temp - 273) + 32);

      // Create CSS/HTML styles and content
      $("body").css(getBackground(weather.weather[0].icon));
      $(".header").html('<h1>Current Weather <br />' + '&lsquo;' + weatherType + '&rsquo;');
      $("#icon").html(icon);
      $("#info").html(infoHTML(city, country, weatherType));
      $("#temp").html(tempHTML(fahrenheit));

      // toggle fahrenheit / celsius function
      $('#temp').click(function() {
        $('#temp').html(toggleTemperature(fahrenheit, celsius));
      });
    });
  });
});
