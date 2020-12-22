const db = require("../models");
const GameScore = db.gameScore;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  // if (!req.body.score) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a GameScore
  const gameScore = {
    GameId:req.body.GameId,
    UserId:req.body.UserId,
    Score: req.body.Score,

  };

  // Save GameScore in the database
  GameScore.create(gameScore)
    .then((data) => {
      res.send(data);
      console.log("----------------------------------")
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the GameScore.",
      });
    });
};

//Retrieve all GameScores from the database.
exports.findAll = (req, res) => {
  //   const GameName = req.query.GameName;
  // var condition = GameName ? { GameName: { [Op.like]: `%${GameName}%` } } : null;

  GameScore.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving gameScores.",
      });
    });
};

  exports.findOne = (req, res) => {
    const id = req.params.id;

    GameScore.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving GameScore with id=" + id
        });
      });
  };

  // Update a GameScore by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;

    GameScore.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "GameScore was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update GameScore with id=${id}. Maybe GameScore was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating GameScore with id=" + id
        });
      });
  };
  // Delete a GameScore with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;

    GameScore.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "GameScore was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete GameScore with id=${id}. Maybe GameScore was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete GameScore with id=" + id
        });
      });
  };

  // Delete all GameScores from the database.
  exports.deleteAll = (req, res) => {
    GameScore.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} GameScores were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all gameScores."
        });
      });
  };
  // Find all published GameScores
  exports.findAllPublished = (req, res) => {
    GameScore.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving gameScores."
        });
      });
  };

  exports.getGameUserCount = (req, res) => {
    console.log("here-----------------------------")
    db.sequelize.query("select games.GameName,count(gamescores.UserId) as usercount from games,gamescores where games.id=gamescores.GameId group by gamescores.GameId "
      ,
      {
  
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(data => {
        res.send(data);
        console.log("here2222222-----------------------------")
        console.log(data);
      });
  
  
  
    // Game.findAll({
  
    //   group: ['GameId'],
    //   include: [{
    //     model: GameScore,
  
    //   }]
    // }).then(data => {
    //   res.send(data);
    //   console.log("here2222222-----------------------------")
    //   console.log(data);
    // });
  
  }
  
  
  
  exports.getUsersWithHighGameScore = (req, res) => {
    console.log("here-----------------------------")
    db.sequelize.query("select users.username, gamescores.score as maxscore from users, gamescores where users.id = gamescores.UserId order by gamescores.score desc"
      ,
      {
  
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(data => {
        res.send(data);
        console.log("here2222222-----------------------------")
        console.log(data);
      });
  }
  
  exports.getGameScore = (req,res)=>{

    //show quizscore using user id
    db.sequelize.query("select games.GameName as gamename,max(gamescores.Score) as score from gamescores,games where userid=? and gamescores.GameId = games.id;",
    {
        replacements:[req.params.id,req.params.id], 
        type: db.sequelize.QueryTypes.SELECT})
        .then(data=>{
            res.send(data);
            console.log(data);
        });
  }
  