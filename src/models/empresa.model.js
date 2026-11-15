import connection from "../config/db.js";
import { DataTypes } from "sequelize";

const Empresa = connection.define("Empresa", {

    id_empresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

}, {
    tableName: "empresas",
    timestamps: false
})

export default Empresa;