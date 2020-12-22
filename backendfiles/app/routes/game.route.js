module.exports = app => {
    const game = require("../controllers/game.controller.js");
  
    var router = require("express").Router();
  
    const bodyParser = require("body-parser");
  
  router.use(bodyParser.json());
  
    // Create a new Game
    router.post("/", game.create);
  
   // Retrieve all Games
    router.get("/", game.findAll);
  
    // // Retrieve all published Games
    router.get("/published", game.findAllPublished);
  
    // // Retrieve a single Game with id
    router.get("/:id", game.findOne);
  
    // // Update a Game with id
    router.put("/:id", game.update);
  
    // // Delete a Game with id
    router.delete("/:id", game.delete);
  
    // // Delete all Games
    router.delete("/", game.deleteAll);
  
    app.use('/api/game', router);
  };