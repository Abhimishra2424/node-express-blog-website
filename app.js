const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// mongo user
const dbURL =
  "mongodb+srv://abhi24:node24@nodetut.kk0xc.mongodb.net/node-tut?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware $ static flies
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs routes
app.use("/blogs", blogRoutes);

// 404 page not found
app.use((req, res) => {
  res.status(404).render("404", { title: "404 page" });
});
