// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
    //res.render("create");
  });

  // view of the home page
  app.get("/home", isAuthenticated, (req, res) => {
    res.render("index");
  });

  // view of the create a project page
  app.get("/create", isAuthenticated, (req, res) => {
    res.render("create");
  });

  // view of the view projects page
  app.get("/viewProjects", isAuthenticated, (req, res) => {
    //  pulling all the projects from the database
    db.Project.findAll({
      where: {
        UserId: req.user.id,
      }

    }).then(function(data) {
      console.log(data);
      res.render("viewProjects", data);
    });
  });

  // view of the view support page
  app.get("/support", isAuthenticated, (req, res) => {
    res.render("support");
  });
};
