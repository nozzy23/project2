// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      number: req.body.number,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //returns all orders in json format
  app.get("/api/orders", (req, res) => {
    db.Order.findAll()
      .then((orders) => res.json(orders))
      .catch((err) => console.log(err));
  });

  //returns brand new orders
  app.get("/api/orders/received", (req, res) => {
    db.Order.findAll({ where: { status: '0' } })
      .then((orders) => res.json(orders))
      .catch((err) => console.log(err));
  });

  //returns orders in progress
  app.get("/api/orders/inprogress", (req, res) => {
    db.Order.findAll({ where: { status: '1' } })
      .then((orders) => res.json(orders))
      .catch((err) => console.log(err));
  });

  //returns orders ready for delivery/pickup
  app.get("/api/orders/ready", (req, res) => {
    db.Order.findAll({ where: { status: '2' } })
      .then((orders) => res.json(orders))
      .catch((err) => console.log(err));
  });

  //returns completed orders.
  app.get("/api/orders/completed", (req, res) => {
    db.Order.findAll({ where: { status: '3' } })
      .then((orders) => res.json(orders))
      .catch((err) => console.log(err));
  });

  //returns order by id
  app.get("/api/orders/:id", (req, res) => {
    db.Order.findOne({ where: { id: req.params.id } })
      .then((orders) => res.json(orders))
      .catch((err) => console.log(err));
  });

  app.get("/api/menu/", (req, res) => {
    db.Menu.findAll()
      .then((menus) => res.json(menus))
      .catch((err) => console.log(err));
  });

  app.post("/api/order", function (req, res) {
    db.Order.create({
      order: JSON.stringify(req.body.order),
      customer_id: req.user.id,
      status: '0'
    }).then((newOrder) => {
      res.json("Order was created!");
    }).catch((err) => console.log(err));
    
  });

  app.put("/api/order", function (req, a, res) {
    db.Order.findOne({ where: { id: a } })
      .then((order) => {
        order
          .update({ status: '1' })
          .then((updatedOrder) => res.json("Order was updated!"))
          .catch(console.error);
      })
      .catch(console.error);
  });

  app.get("/api/table/", (req, res) => {
    db.Table.findAll()
      .then((tables) => res.json(tables))
      .catch((err) => console.log(err));
  });

  app.post("/api/table", function (req, res) {
    db.Table.create({
      customer_id: req.user.id,
      number_people: req.body.number_people,
      time_reserved: req.body.time_reserved
    }).then((newTable) => {
      res.json("Table was created!");
    }).catch((err) => console.log(err));
  });
};