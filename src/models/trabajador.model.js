import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Trabajador = sequelize.define("Trabajador", {
    idTrabajador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    cv: {
        type: DataTypes.TEXT
    }
}, {
    tableName: "trabajadores",
    timestamps: false,
    underscored: true
});

export default Trabajador;
