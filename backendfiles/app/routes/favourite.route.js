module.exports = app => {
    const favourite = require("../controllers/favourite.controller.js");
    const cors = require("cors");
    var router = require("express").Router();
  
    const bodyParser = require("body-parser");
    router.use(cors());

  router.use(bodyParser.json());
  
    // Create a new favourite
    router.post("/", favourite.create);
  
   // Retrieve all favourites
    //router.get("/", favourite.findAll);
    
    // Retrieve a single favourite with id
    router.get("/aaaa", favourite.findOne);
  
    // Update a favourite with id
    router.put("/:id", favourite.update);
  
    // Delete a favourite with id
    router.delete("/:id", favourite.delete);
  
    // Delete all favourites
    router.delete("/", favourite.deleteAll);

    //favourite quiz of user
    router.get("/:id", favourite.getFavourite);

    //button disable
  
    app.use('/api/favourite', router);
  };