// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Waiting = sequelize.define("Waiting", {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {timestamps: false,});
  return Waiting;
};
