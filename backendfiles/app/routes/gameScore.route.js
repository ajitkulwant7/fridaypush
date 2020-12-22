module.exports = app => {
    const gameScore = require("../controllers/gameScore.controller.js");
    const cors = require("cors");
    var router = require("express").Router();
  
    const bodyParser = require("body-parser");
    router.use(cors());
  router.use(bodyParser.json());
  
  router.get("/getGameUserCount", gameScore.getGameUserCount);

  
  router.get("/getUsersWithHighGameScore", gameScore.getUsersWithHighGameScore);
    // Create a new GameScore
    router.post("/", gameScore.create);
  
   // Retrieve all GameScores
    // router.get("/", gameScore.findAll);

    //gaet gamescore
    router.get("/:id", gameScore.getGameScore);

  
    // // Retrieve all published GameScores
    router.get("/published", gameScore.findAllPublished);
  
    // // Retrieve a single GameScore with id
    // router.get("/:id", gameScore.findOne);
  
    // // Update a GameScore with id
    router.put("/:id", gameScore.update);
  
    // // Delete a GameScore with id
    router.delete("/:id", gameScore.delete);
  
    // // Delete all GameScores
    router.delete("/", gameScore.deleteAll);
  
    app.use('/api/gameScore', router);
  };