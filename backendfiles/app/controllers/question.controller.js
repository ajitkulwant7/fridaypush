const db = require("../models");
const Questions = db.questions;
const Op = db.Sequelize.Op;




  exports.create = (req, res) => {
    // Validate request
    if (!req.body.QuestionStatement) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a Questions 
    const questions = {
    
      QuestionStatement: req.body.QuestionStatement,
      QuizId: req.body.QuizId,
      Option1: req.body.Option1,
      Option2: req.body.Option2,
      Option3: req.body.Option3,
      Option4: req.body.Option4,
      Answers: req.body.Answers,

      IsMcq: req.body.IsMcq ? req.body.IsMcq : false
      

    };

  // Save Questions in the database
  Questions.create(questions)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Questions."
      });
    });
};



exports.findAll = (req, res) => {

  console.log("---------");
  
      const Quizid = req.query.QuizId;
      //var condition = QuestionsId ? { QuestionsId: { [Op.like]: `%${QuestionsId}%` } } : null;
    
      Questions.findAll({ where:{QuizId:Quizid} })
      
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






//Retrieve all Questions from the database.
// exports.findAll = (req, res) => {


//     const QuestionsId = req.query.QuestionsId;
//     var condition = QuestionsId ? { QuestionsId: { [Op.like]: `%${QuestionsId}%` } } : null;
  
//     Questions.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving questions."
//         });
//       });
//   };
  
  // exports.findOne = (req, res) => {
  //   const id = req.params.id;
  
  //   Questions.findByPk(id)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Error retrieving Questions with id=" + id
  //       });
  //     });
  // };

//   // Update a Questions by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Questions.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Questions was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Questions with id=${id}. Maybe Questions was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Questions with id=" + id
        });
      });
  };
//   // Delete a Questions with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Questions.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Questions was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Questions with id=${id}. Maybe Questions was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Questions with id=" + id
        });
      });
  };
  
//   // Delete all Questions from the database.
  exports.deleteAll = (req, res) => {
    Questions.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Questions were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all questions."
        });
      });
  };
  // Find all published Questions
  exports.findAllPublished = (req, res) => {
    Questions.findAll({ where: { published: true } })
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