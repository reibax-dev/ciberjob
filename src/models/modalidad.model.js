import { DataTypes, Utils } from "sequelize";
import connection from "../config/db.js";

const Modalidad = connection.define("Modalidad",{
    idModalidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    tableName: "modalidad",
    timestamps:false,
    underscored: true,
});

export default Modalidad;