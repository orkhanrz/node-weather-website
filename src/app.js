const hbs = require("hbs");
const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const PORT = 3000;

// Directories
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Express and hbs settings
app.use(express.static(publicDirPath));
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Orkhan Rzali",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Need a help? Follow the links above.",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "No address was provided.",
    });
  }

  geocode(address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    weather(lat, lon, (error, weatherData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast: weatherData,
        location,
        address,
      });
    });
  });
});

app.get("/weather/*", (req, res) => {
  res.render("error", {
    errorMessage: "Weather Article is not found.",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log(`Your server runs on port number: ${PORT}`);
});
