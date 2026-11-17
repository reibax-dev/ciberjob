import { DataTypes, Utils } from "sequelize";
import sequelize from "../config/db.js";

const Modalidad = sequelize.define("Modalidad",{
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
    tableName: "modalidades",
    timestamps:false,
    underscored: true,
});

export default Modalidad;