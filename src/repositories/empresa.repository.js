import Empresa from "../models/empresa.model.js";

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

    await empresa.destroy();

    return empresa;
}

export default {
    getAll,
    getById,
    getByIdUsuario,
    create,
    update,
    remove
};