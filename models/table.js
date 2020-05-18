// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_reserved: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {timestamps: false,});
  return Table;
};
