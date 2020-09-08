$(document).ready(() => {
  console.log("working");
  // Getting references to our form and input
  const createForm = $("#createButton");
  const chemicalInput = $("#chemical-input");
  const unitInput = $("#unit-input");
  const volumeInput = $("#volume-input");
  const ouncesInput = $("#ounces-input");
  const windInput = $("#wind-input");
  const tempInput = $("#unit-input");

  // When the submit button on the create page is clicked
  createForm.on("click", (event) => {
    event.preventDefault();
    // this is the data being sent to the databse(req.body)
    const userData = {
      chemical: chemicalInput.val(),
      unit: unitInput.val(),
      volume: volumeInput.val(),
      ounces: ouncesInput.val(),
      wind: windInput.val(),
      temp: tempInput.val(),
    };

    console.log(userData);
    // prevents the databse from having empty rows
    if (
      !userData.chemical ||
      !userData.unit ||
      !userData.volume ||
      !userData.ounces ||
      !userData.wind ||
      !userData.temp
    ) {
      return;
    }

    // Does a post to the create route. If successful, we are redirected to the  page
    $.post("/api/create", userData)
      .then(() => {
        window.location.replace("/view");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);

    chemicalInput.val("");
    unitInput.val("");
    volumeInput.val("");
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
