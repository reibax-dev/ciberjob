import Empresa from "../models/empresa.model.js";
import { Usuario, Oferta, OfertaTrabajador } from "../models/index.js";
import sequelize from "../config/db.js";
import usuarioRepository from "./usuario.repository.js";

async function getAll() {
    const empresas = await Empresa.findAll();
    return empresas;
}

async function getById(idEmpresa) {
    const empresaEncontrada = await Empresa.findByPk(idEmpresa);
    return empresaEncontrada;
}

const getByIdUsuario = async (idUsuario) => {
    try{
        const empresa = await Empresa.findOne({where: {idUsuario}});
        return empresa;
    }catch (error){
        throw error;
    }
}

async function create(datosEmpresa) {
    const nuevaEmpresa = await Empresa.create(datosEmpresa);
    return nuevaEmpresa;
}

// crea el usuario y su empresa a la vez (transacción): si falla uno no se guarda ninguno
async function createConUsuario(datosUsuario, datosEmpresa) {
    const nuevaEmpresa = await sequelize.transaction(async (t) => {
        const usuario = await usuarioRepository.create(datosUsuario, t);
        return await Empresa.create({ ...datosEmpresa, idUsuario: usuario.idUsuario }, { transaction: t });
    });
    return nuevaEmpresa;
}

async function update(idEmpresa, datosEmpresa) {
    const empresa = await Empresa.findByPk(idEmpresa);

    if (empresa === null) {
        return null;
    }

    empresa.nombre = datosEmpresa.nombre;

    await empresa.save();

    return empresa;
}

async function remove(idEmpresa) {
    const empresa = await Empresa.findByPk(idEmpresa);

    if (empresa === null) {
        return null;
    }

    // borra también sus ofertas (con sus inscripciones) y su usuario: todo o nada
    await sequelize.transaction(async (t) => {
        const ofertas = await Oferta.findAll({ where: { idEmpresa }, transaction: t });
        await OfertaTrabajador.destroy({ where: { idOfertas: ofertas.map(o => o.idOfertas) }, transaction: t });
        await Oferta.destroy({ where: { idEmpresa }, transaction: t });
        await empresa.destroy({ transaction: t });
        await Usuario.destroy({ where: { idUsuario: empresa.idUsuario }, transaction: t });
    });

    return empresa;
}

export default {
    getAll,
    getById,
    getByIdUsuario,
    create,
    createConUsuario,
    update,
    remove
};