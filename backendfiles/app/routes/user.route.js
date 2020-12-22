module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const cors = require("cors");
 
  var router = require("express").Router();
  router.use(cors());
  const bodyParser = require("body-parser");

  router.use(bodyParser.json());

 

  // Create a new Tutorial
  router.post("/", users.create);

  // Retrieve all Tutorials
  router.get("/", users.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  router.post("/signin",users.signin);


  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Delete all Tutorials
  router.delete("/", users.deleteAll);

  app.use('/api/user', router);
};