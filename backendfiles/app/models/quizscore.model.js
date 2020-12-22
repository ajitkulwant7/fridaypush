module.exports = (sequelize, Sequelize) => {
    const QuizScore = sequelize.define("quizscore", {
      quizid: {
        type: Sequelize.INTEGER,
        references: {
            model:'quizzes',
            Key: 'id'
        }
      },
      userid: {
        type: Sequelize.INTEGER,
        // references: 'users',
        // referencesKey: 'id'
        references: {
            model:'users',
            Key: 'id'
        }
      },
      score:{
        type: Sequelize.INTEGER
      }
    },
    {timestamps: false});
    QuizScore.removeAttribute('id');
  
    return QuizScore;
  };

 
