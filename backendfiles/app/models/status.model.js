module.exports = (sequelize, Sequelize) => {
    const status = sequelize.define("status", {
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
      },
      QuestionsAttempted:{
        type: Sequelize.INTEGER
      }
    },
    {timestamps: false});
    status.removeAttribute('id');
  
    return status;
  };

 
