import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Empresa = connection.define("Empresa", {
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
    tableName: "empresa",
    timestamps: false,
    underscored: true
});

export default Empresa;
