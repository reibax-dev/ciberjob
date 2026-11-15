import Empresa from "../models/empresa.model.js";

async function listarEmpresas() {
    const empresas = await Empresa.findAll();
    return empresas;
}

async function buscarEmpresa(idEmpresa) {

    const empresaEncontrada = await Empresa.findByPk(idEmpresa);

    return empresaEncontrada;
}

async function crearEmpresa(datosEmpresa) {

    const nuevaEmpresa = await Empresa.create(datosEmpresa);

    return nuevaEmpresa;
}

async function actualizarEmpresa(idEmpresa, datosEmpresa) {

    const empresa = await Empresa.findByPk(idEmpresa);

    if (empresa === null) {
        return null;
    }

    empresa.nombre = datosEmpresa.nombre;

    await empresa.save();

    return empresa;
}

async function eliminarEmpresa(idEmpresa) {

    const empresa = await Empresa.findByPk(idEmpresa);

    if (empresa === null) {
        return null;
    }

    await empresa.destroy();

    return empresa;
}

export { listarEmpresas, buscarEmpresa, crearEmpresa, actualizarEmpresa, eliminarEmpresa };