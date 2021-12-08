const input = document.querySelector("input");
const form = document.querySelector("form");
const locationText = document.querySelector(".location");
const forecastText = document.querySelector(".forecast");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    console.log("Please provide address.");
  } else {
    fetch(`http://localhost:3000/weather?address=${input.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          locationText.textContent = data.error;
          forecastText.textContent = "";
        } else {
          locationText.textContent = data.location;
          forecastText.textContent = data.forecast;
        }
      });
  }

  input.value = "";
});
