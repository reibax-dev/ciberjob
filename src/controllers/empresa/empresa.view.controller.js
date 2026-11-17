import {
    listarEmpresas,
    buscarEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
} from "../../repositories/empresa.repository.js";

async function mostrarEmpresas(req, res) {

    const empresas = await listarEmpresas();
    return res.render("empresa/list", { empresas });
}

async function mostrarEmpresaPorID(req, res) {
    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).send("ID de empresa no válido.");
    }

    const empresa = await buscarEmpresa(idEmpresa);

    if (empresa === null) {
        return res.status(404).send("Empresa no encontrada.");
    }

    return res.render("empresa/show", { empresa });
}

function mostrarFormularioCrear(req, res) {
    return res.render("empresa/create");
}

async function guardarEmpresa(req, res) {
    const nombre = req.body.nombre;
    const idUsuario = Number(req.body.id_usuario);

    if (
        typeof nombre !== "string" ||
        nombre.trim().length === 0 ||
        nombre.trim().length > 100
    ) {
        return res.status(400).send(
            "El nombre debe tener entre 1 y 100 caracteres."
        );
    }

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).send(
            "El ID de usuario debe ser un número entero positivo."
        );
    }

    const empresaCreada = await crearEmpresa({
        nombre: nombre.trim(),
        id_usuario: idUsuario
    });

    return res.redirect("/empresa/" + empresaCreada.id_empresa);
}

async function mostrarFormularioEditar(req, res) {
    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).send("ID de empresa no válido.");
    }

    const empresa = await buscarEmpresa(idEmpresa);

    if (empresa === null) {
        return res.status(404).send("Empresa no encontrada.");
    }

    return res.render("empresa/edit", { empresa });
}

async function guardarCambiosEmpresa(req, res) {
    const idEmpresa = Number(req.params.id);
    const nuevoNombre = req.body.nombre;

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).send("ID de empresa no válido.");
    }

    if (
        typeof nuevoNombre !== "string" ||
        nuevoNombre.trim().length === 0 ||
        nuevoNombre.trim().length > 100
    ) {
        return res.status(400).send(
            "El nombre debe tener entre 1 y 100 caracteres."
        );
    }

    const empresaActualizada = await actualizarEmpresa(idEmpresa, {
        nombre: nuevoNombre.trim()
    });

    if (empresaActualizada === null) {
        return res.status(404).send("Empresa no encontrada.");
    }

    return res.redirect("/empresa/" + empresaActualizada.id_empresa);
}

async function borrarEmpresaDesdeVista(req, res) {
    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).send("ID de empresa no válido.");
    }

    const empresaEliminada = await eliminarEmpresa(idEmpresa);

    if (empresaEliminada === null) {
        return res.status(404).send("Empresa no encontrada.");
    }

    return res.redirect("/empresa");
}

export {
    mostrarEmpresas,
    mostrarEmpresaPorID,
    mostrarFormularioCrear,
    guardarEmpresa,
    mostrarFormularioEditar,
    guardarCambiosEmpresa,
    borrarEmpresaDesdeVista
};