const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const paciente = sequelize.define('paciente', {
  cpf: {type: DataTypes.STRING(14), primaryKey: true,
    autoIncrement: false,
  },
  nome_completo: {type: DataTypes.STRING(50),allowNull: false,
  },
  dia_marc: {type: DataTypes.DATE,allowNull: false
  },
  hora_marc: {type: DataTypes.TIME,allowNull: false
  },
  idade: { type: DataTypes.INTEGER,allowNull: false
  },
}, {tableName: 'paciente',timestamps: false 
});
module.exports = paciente;