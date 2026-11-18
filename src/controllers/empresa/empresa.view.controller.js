import empresaRepository from "../../repositories/empresa.repository.js";
import usuarioRepository from "../../repositories/usuario.repository.js"

async function getAll(req, res) {
    const empresas = await empresaRepository.getAll();
    const usuarios = [];
    for(let empresa of empresas){
        usuarios.push(await usuarioRepository.getById(empresa.idUsuario));
    }
    return res.render("empresa/list", { empresas, usuarios });
}

async function getById(req, res) {
    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).send("ID de empresa no válido.");
    }

    const empresa = await empresaRepository.getById(idEmpresa);

    if (empresa === null) {
        return res.status(404).send("Empresa no encontrada.");
    }
    const usuario = await usuarioRepository.getById(empresa.idUsuario);

    return res.render("empresa/show", { empresa,usuario });
}

function createForm(req, res) {
    return res.render("empresa/create");
}

async function create(req, res) {
    //const nombre = req.body.nombre;
    //const idUsuario = Number(req.body.idUsuario);
    const {nom_usuario, email, contrasenia, contraseniaRepeat, telefono, nom_empresa } = req.body;
    let idUser;
    if (
        typeof nom_empresa !== "string" ||
        nom_empresa.trim().length === 0 ||
        nom_empresa.trim().length > 100
    ) {
        return res.status(400).send(
            "El nombre debe tener entre 1 y 100 caracteres."
        );
    } else if (contrasenia !== contraseniaRepeat) {
        res.redirect("empresa/new/");
    }

    /* if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).send(
            "El ID de usuario debe ser un número entero positivo."
        );
    }
    if (contrasenia !== contraseniaRepeat) {
        res.redirect("usuario/new/err");
    } */ 
   else {
        const user = await usuarioRepository.create({
            nombre: nom_usuario,
            email,
            contrasenia,
            telefono,
            admin:false
        })
        //res.redirect("/usuario/" + user.idUsuario);
        idUser = user.idUsuario;
    }
    nom_empresa.trim()
    const empresaCreada = await empresaRepository.create({
        nombre: nom_empresa,
        idUsuario: idUser
    });

    return res.redirect("/empresa/" + empresaCreada.idEmpresa);
}

async function updateForm(req, res) {
    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).send("ID de empresa no válido.");
    }

    const empresa = await empresaRepository.getById(idEmpresa);

    if (empresa === null) {
        return res.status(404).send("Empresa no encontrada.");
    }

    return res.render("empresa/edit", { empresa });
}

async function update(req, res) {
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

    const empresaActualizada = await empresaRepository.update(idEmpresa, {
        nombre: nuevoNombre.trim()
    });

    if (empresaActualizada === null) {
        return res.status(404).send("Empresa no encontrada.");
    }

    return res.redirect("/empresa/" + empresaActualizada.idEmpresa);
}

async function remove(req, res) {
    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).send("ID de empresa no válido.");
    }

    const empresaEliminada = await empresaRepository.remove(idEmpresa);

    if (empresaEliminada === null) {
        return res.status(404).send("Empresa no encontrada.");
    }

    return res.redirect("/empresa");
}

export default {
    getAll,
    getById,
    createForm,
    create,
    updateForm,
    update,
    remove
};