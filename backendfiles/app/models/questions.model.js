module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define("questions", {
   
      QuestionStatement: {
        type: Sequelize.STRING
      },
      QuizId: {
        type: Sequelize.INTEGER,
        references: { model: "quizzes", key: "id" },
      },
      Option1: {
        type: Sequelize.STRING
      }, 
      Option2: {
        type: Sequelize.STRING
      },
       Option3: {
        type: Sequelize.STRING
      },
       Option4: {
        type: Sequelize.STRING
      },
      IsMcq: {
        type: Sequelize.BOOLEAN
      },
      Answers:{
        type: Sequelize.STRING
      }

    },{timestamps: false});
  
    return Questions;
  };