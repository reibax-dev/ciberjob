import { DataTypes, Utils } from "sequelize";
import connection from "../config/db.js";

const Categoria = connection.define("Categoria",{
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion:{
        type:DataTypes.TEXT
    },
},{
    tableName: "categoria",
    timestamps:false,
    underscored: true,
});

export default Categoria;