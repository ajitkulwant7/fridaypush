const db = require("../models");
const QuizScore = db.quizscore;
const Quiz = db.quiz;
const Questions = db.questions;
const Favourite = db.favourite;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {

  Quiz.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.create = (req, res) => {

  const quiz = {
    quizname: req.body.quizname,
    category: req.body.category,
  };

  // Save Tutorial in the database
  Quiz.create(quiz)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

};

exports.findByCategory = (req, res) => {
  const category1 = req.params.category;
  // var condition = QuestionsId ? { QuestionsId: { [Op.like]: `%${QuestionsId}%` } } : null;
  console.log("---------------change-----------------");

  Quiz.findAll({
    where: {
      category: category1
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Quiz.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Quiz.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Quiz.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Quiz.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};




exports.deleteQuiz = (req, res) => {
  const id1 = req.params.id;
  console.log("hi-------===============" + id1);
  Favourite.destroy({
    where: {
      quizid: id1 //this will be your id that you want to delete
    }
  }).then(function (rowDeleted) {
    Questions.destroy({
      where: {
        QuizId: id1 //this will be your id that you want to delete
      }
    }).then(function (rowDeleted) {
      QuizScore.destroy({
        where: {
          quizid: id1 //this will be your id that you want to delete
        }
      }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
          console.log('Deleted successfully');
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
        Quiz.destroy({
          where: {
            id: id1 //this will be your id that you want to delete
          }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
          if (rowDeleted === 1) {
            console.log('Deleted successfully');
            res.send({
              message: "Tutorial was deleted successfully!"
            });
          }
        }).catch((err) => {
          console.log(err);
          res.send(err);
        })
      }).catch((err) => {
        console.log(err);
        res.send(err);
      })

    }).catch((err) => {
      console.log(err);
      res.send(err);
    })

  }).catch((err) => {
    console.log(err);
    res.send(err);
  })

}

