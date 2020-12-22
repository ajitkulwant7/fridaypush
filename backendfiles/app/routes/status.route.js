module.exports = app => {
    const status = require("../controllers/status.controller.js");
    const cors = require("cors");
    var router = require("express").Router();
  
    const bodyParser = require("body-parser");
    router.use(cors());

  router.use(bodyParser.json());
  
    // Create a new Tutorial
    router.post("/", status.create);
  
   // Retrieve all Tutorials
    router.get("/aaa", status.findAll);

    // router.get("/", status.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/", status.findOne);
  
    // Update a Tutorial with id
    router.put("/", status.update);
  
    // Delete a Tutorial with id
    router.delete("/", status.delete);
  
    // Delete all Tutorials
    // router.delete("/", status.deleteAll);
  
    app.use('/api/status', router);
  };