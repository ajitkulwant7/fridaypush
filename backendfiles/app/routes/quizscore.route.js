module.exports = app => {
    const quizescore = require("../controllers/quizscore.controller.js");
    const cors = require("cors");
    var router = require("express").Router();
  
    const bodyParser = require("body-parser");
    router.use(cors());
   
  router.use(bodyParser.json());
  router.get("/getQuizUserCount", quizescore.getQuizUserCount);
  router.get("/getUsersWithHighQuizScore", quizescore.getUsersWithHighQuizScore);
    // Create a new Tutorial
    router.post("/", quizescore.create);
  
   // Retrieve all Tutorials
    router.get("/", quizescore.findAll);

    router.get("/:id", quizescore.getQuizScore);
  
    // Retrieve a single Tutorial with id
    router.get("/aaaa", quizescore.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", quizescore.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", quizescore.delete);
  
    // Delete all Tutorials
    router.delete("/", quizescore.deleteAll);


    router.post("/sendmail", quizescore.sendMail);
  
    app.use('/api/quizscore', router);
  };