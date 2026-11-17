import { Empresa } from "../models/index.js";


// ------------------ CRUD de empresa ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data)=>{
    const empresa = await Empresa.create(data)
    return empresa;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async() => {
    const empresas = await Empresa.findAll();
    return empresas;
};

// endpoint dato individual
const getById = async (id) => {
    const empresa = await Empresa.findByPk(id);
    return empresa;
};


export default {
    create,
    getAll,
    getById
}
