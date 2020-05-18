// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    order: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 //0 = received, 1 = in progress, 2 = ready for customer, 3 = delivered.
    },
  }, {timestamps: false,});
  return Order;
};
