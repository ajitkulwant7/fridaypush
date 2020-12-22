module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quiz", {
      quizname: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      }
    },
    {timestamps: false});
  
    return Quiz;
  };