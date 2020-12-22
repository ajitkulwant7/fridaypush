const db = require("../models");
const Game = db.games;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.GameName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Game
  const game = {
    GameName: req.body.GameName,
  };

  // Save Game in the database
  Game.create(game)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Game.",
      });
    });
};

//Retrieve all Games from the database.
exports.findAll = (req, res) => {
  //   const GameName = req.query.GameName;
  // var condition = GameName ? { GameName: { [Op.like]: `%${GameName}%` } } : null;

  Game.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Games.",
      });
    });
};

  exports.findOne = (req, res) => {
    const id = req.params.id;

    Game.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Game with id=" + id
        });
      });
  };

//   // Update a Game by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;

    Game.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Game was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Game with id=${id}. Maybe Game was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Game with id=" + id
        });
      });
  };
//   // Delete a Game with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;

    Game.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Game was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Game with id=${id}. Maybe Game was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Game with id=" + id
        });
      });
  };

//   // Delete all Games from the database.
  exports.deleteAll = (req, res) => {
    Game.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Games were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all games."
        });
      });
  };
//   // Find all published Games
  exports.findAllPublished = (req, res) => {
    Game.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving games."
        });
      });
  };
