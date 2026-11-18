
import { OfertaTrabajador } from "../models/index.js";


// ------------------ Inscripciones de trabajadores en ofertas (tabla ofertas_trabajadores) ----------------------------

// ------------------ C (Create)
// inscribe al trabajador en la oferta (si ya estaba inscrito no hace nada)
const inscribir = async (idOfertas, idTrabajador)=>{
    const [inscripcion] = await OfertaTrabajador.findOrCreate({where: {idOfertas, idTrabajador}});
    return inscripcion;
}


// ------------------ R (Read)---------------------------------------------
// ids de las ofertas en las que está inscrito un trabajador
const getIdsOfertas = async (idTrabajador)=>{
    const inscripciones = await OfertaTrabajador.findAll({where: {idTrabajador}});
    return inscripciones.map(i => i.idOfertas);
}


// ------------------------ D (Delete)------------
// da de baja al trabajador de la oferta
const baja = async (idOfertas, idTrabajador)=>{
    const borradas = await OfertaTrabajador.destroy({where: {idOfertas, idTrabajador}});
    return borradas;
}


export default {
    inscribir,
    getIdsOfertas,
    baja
}
