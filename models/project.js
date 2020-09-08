module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    chemical: DataTypes.STRING,
    unit: DataTypes.STRING,
    volume: DataTypes.INTEGER,
    area: DataTypes.INTEGER,
    ounces: DataTypes.INTEGER,
    windspeed: DataTypes.INTEGER,
    tempF: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN,
  });
  Project.associate = function (models) {
    // We're saying that a Project should belong to a User
    // A project can't be created without a user due to the foreign key constraint
    Project.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Project;
};
