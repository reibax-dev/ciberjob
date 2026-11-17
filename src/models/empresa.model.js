import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Empresa = sequelize.define("Empresa", {

    idEmpresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: "empresas",
    timestamps: false,
    underscored: true
});

export default Empresa;
