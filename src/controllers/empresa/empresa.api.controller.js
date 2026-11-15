import { listarEmpresas, buscarEmpresa, crearEmpresa, actualizarEmpresa, eliminarEmpresa } from "../../repositories/empresa.repository.js";

async function obtenerEmpresas(req, res) {

    const empresas = await listarEmpresas();
    res.json(empresas);
}

async function obtenerEmpresaPorID(req, res) {

    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).json({ error: "ID de empresa no válido. Debe ser un número entero y positivo." });
    }

    const empresaEncontrada = await buscarEmpresa(idEmpresa);

    if (empresaEncontrada === null) {
        return res.status(404).json({ error: "ID sin asociar a ninguna empresa." });
    } else {
        return res.json(empresaEncontrada);
    }
}

async function registrarEmpresa(req, res) {

    const idUsuario = Number(req.body.id_usuario);
    const nombre = req.body.nombre;

    if (
        typeof nombre !== "string" ||
        nombre.trim().length === 0 ||
        nombre.trim().length > 100
    ) {
        return res.status(400).json({ error: "El nombre debe tener entre 1 y 100 caracteres." });
    }

    if (
        !Number.isInteger(idUsuario) ||
        idUsuario <= 0
    ) {
        return res.status(400).json({ error: "El ID de usuario debe ser un número entero positivo." });
    }

    const empresaCreada = await crearEmpresa({
        nombre: nombre.trim(),
        id_usuario: idUsuario
    });

    return res.status(201).json(empresaCreada);
}

async function editarEmpresa(req, res) {

    const idEmpresa = Number(req.params.id);
    const nuevoNombre = req.body.nombre;

    if (
        !Number.isInteger(idEmpresa) ||
        idEmpresa <= 0
    ) {
        return res.status(400).json({ error: "ID no válido." });
    }

    if (
        typeof nuevoNombre !== "string" ||
        nuevoNombre.trim().length === 0 ||
        nuevoNombre.trim().length > 100
    ) {
        return res.status(400).json({ error: "El nombre debe tener entre 1 y 100 caracteres." });
    }

    const empresaActualizada = await actualizarEmpresa(idEmpresa, {
        nombre: nuevoNombre.trim()
    });

    if (empresaActualizada === null) {
        return res.status(404).json({ error: "ID sin asociar a ninguna empresa." });
    }

    return res.json(empresaActualizada);

}

async function borrarEmpresa(req, res) {

    const idEmpresa = Number(req.params.id);

    if (
        !Number.isInteger(idEmpresa) ||
        idEmpresa <= 0
    ) {
        return res.status(400).json({ error: "ID no válido." })
    }

    const empresaEliminada = await eliminarEmpresa(idEmpresa);

    if (empresaEliminada === null) {
        return res.status(404).json({ error: "No se pudo encontrar y eliminar la empresa solicitada." })
    }

    return res.json({ mensaje: "Empresa eliminada correctamente." });

}


export { obtenerEmpresas, obtenerEmpresaPorID, registrarEmpresa, editarEmpresa, borrarEmpresa };