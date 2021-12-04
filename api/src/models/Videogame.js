const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL,
      // validate: {
      //   isDecimal: true,        
      // }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://pbs.twimg.com/profile_images/1462879563692793860/4rlkGctz_400x400.jpg'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    //TIMESTAMPS//
    // timestamps: false
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
  });
};
