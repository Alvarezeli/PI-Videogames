const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
      }
    },
    rating: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true,        
      }
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    //TIMESTAMPS//
    // timestamps: false
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
  });
};
