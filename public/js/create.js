$(document).ready(() => {
  console.log("working");
  // Getting references to our form and input

  const submitForm = $("#submitButton");
  const chemicalInput = $("#chemical-input");
  const unitInput = $("#unit-input");
  const volumeInput = $("#volume-input");
  const areaInput = $("#area-input");
  const ouncesInput = $("#ounces-input");
  const windInput = $("#wind-input");
  const tempInput = $("#temp-input");

  // When the submit button on the create page is clicked
  submitForm.on("click", (event) => {
    event.preventDefault();
    // this is the data being sent to the databse(req.body)
    const userData = {
      chemical: chemicalInput.val(),
      unit: unitInput.val(),
      volume: volumeInput.val(),
      area: areaInput.val(),
      ounces: ouncesInput.val(),
      windspeed: windInput.val(),
      tempF: tempInput.val(),
    };

    console.log(userData);
    // prevents the databse from having empty rows
    if (
      !userData.chemical ||
      !userData.unit ||
      !userData.volume ||
      !userData.area ||
      !userData.ounces ||
      !userData.windspeed ||
      !userData.tempF
    ) {
      console.log("help");
      return;
    }

    // Does a post to the create route. If successful, we are redirected to the  page
    $.post("/api/create", userData)
      .then((response) => {
        console.log(response);
        window.location.replace("/viewProjects");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((err) => console.log(err));

    chemicalInput.val("");
    unitInput.val("");
    volumeInput.val("");
    areaInput.val("");
    ouncesInput.val("");
    windInput.val("");
    tempInput.val("");
  });

  // Otherwise we log any errors
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition);
}
function setPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  let url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude&appid=021e0ef373e6b3285caac8c9e9b52544";

  $.ajax({
    url: url,
    method: "GET",
  }).then(function(response) {
    console.log(response);

    let tempF = (response.current.temp - 273.15) * 1.8 + 32;
    $(".temperature-value").text("Temperature (F): " + tempF.toFixed(2));
    console.log(tempF);
    $(".windSpeed").text(
      "Wind Speed: " + response.current.wind_speed + "(mph)"
    );
    $("#temp-input").val(tempF.toFixed(2));
    $("#wind-input").val(response.current.wind_speed.toFixed(2));
  });
}
