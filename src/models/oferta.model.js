
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Oferta = sequelize.define("Oferta", {

        idOfertas:  {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        idCategoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id_categoria'
            }
        },
        idEmpresa:  {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'empresa',
                key: 'id_empresa'
            }
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idModalidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'modalidades',
                key: 'id_modalidad'
            }
        },
        salario: {
            
            type: DataTypes.STRING,  //* PostgreSQL 'money' se mapea como STRING o DECIMAL en Sequelize
            allowNull: false
        },
        ubicacion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
     {

    schema: "public",    
    tableName: "ofertas",
    timestamps: false,           //* porque no tiene created_at , updated_up
    underscored: true
});

export default Oferta ;