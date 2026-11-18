import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OfertaTrabajador = sequelize.define("OfertaTrabajador", {
    idOfertas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        references: {
            model: 'ofertas',
            key: 'id_ofertas'
        }
    },
    idTrabajador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        references: {
            model: 'trabajadores',
            key: 'id_trabajador'
        }
    }
},
    {
        schema: "public",
        tableName: "ofertas_trabajadores",
        timestamps: false,           //* porque no tiene created_at , updated_up
        underscored: true
    }
);

export default OfertaTrabajador;