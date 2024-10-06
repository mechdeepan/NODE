const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define path for for express engine
const publicdirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicdirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app from app.js ",
    name: "Praveen Raja",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Praveen Raja",
    title: "About Me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Hobes",
    message: "This application is user friendly ",
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide the search term",
    });
  }

  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help artical not found");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});


app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help artical not found!",
  });
});

//wild card character
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "page not found",
  });
});

//port listenner
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});