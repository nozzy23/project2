// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    item_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    icon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {timestamps: false,});
  return Menu;
};
