module.exports = (sequelize, Sequelize) => {
  const GameScore = sequelize.define(
    "gameScore",
    {
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: { model: "games", key: "id" },
      },
      Score: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );

  return GameScore;
};
