module.exports = (sequelize, Sequelize) => {
    const Favourite = sequelize.define("favourite", {
      quizid: {
        type: Sequelize.INTEGER,
        references: {
            model:'quizzes',
            Key: 'id'
        }
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
            model:'users',
            Key: 'id'
        }
      }
    },
    {timestamps: false});
    Favourite.removeAttribute('id');
  
    return Favourite;
  };
