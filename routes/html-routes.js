// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/order", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/order.html"));
  });

  app.get("/cook", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/cooks.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tables.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reserve.html"));
  });
  /*
  app.get("/order", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user.role_id == 2) {
      console.log("success!");
      //res.redirect("/members");
    } else {
      console.log("failure!");
      //res.redirect("/members");
    }
  });
  */

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    if (req.user.role_id == 0) {
      res.sendFile(path.join(__dirname, "../public/admins.html"));
    }
    if (req.user.role_id == 1) {
      res.sendFile(path.join(__dirname, "../public/waiters.html"));
    }
    if (req.user.role_id == 2) {
      res.sendFile(path.join(__dirname, "../public/cooks.html"));
    }
    if (req.user.role_id == 3) {
      res.sendFile(path.join(__dirname, "../public/members.html"));
    }
    if (req.user.role_id == 4) {
      res.sendFile(path.join(__dirname, "../public/order.html"));
    }

  });

};
