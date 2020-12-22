module.exports = (sequelize, Sequelize) => {
    const Games = sequelize.define("games", {
   
      GameName: {
        type: Sequelize.STRING
      }
     

    },{timestamps: false});
  
    return Games;
  };