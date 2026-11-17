import { DataTypes, Utils } from "sequelize";
import sequelize from "../config/db.js";

const Categoria = sequelize.define("Categoria",{
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
    tableName: "categorias",
    timestamps:false,
    underscored: true,
});

export default Categoria;