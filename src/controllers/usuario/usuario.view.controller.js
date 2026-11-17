
import usuarioRepository from "../../repositories/usuario.repository.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req, res) => {
    const { nombre, email, contrasenia, contraseniaRepeat, telefono, admin } = req.body;
    if (contrasenia !== contraseniaRepeat || contrasenia.length === 0) {
        res.redirect("usuario/new/err");
    } else {
        const user = await usuarioRepository.create({
            nombre,
            email,
            contrasenia,
            telefono,
            admin
        })
        res.redirect("/usuario/" + user.idUsuario);
    }

}

const createForm = (req, res) => {
    const roles = ["user", "admin"]
    res.render("usuario/create", { roles });
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async (req, res) => {
    const users = await usuarioRepository.getAll();
    res.render("usuario/list", { usuarios: users })
};

// endpoint dato individual
const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await usuarioRepository.getById(id);
    res.render("usuario/show", { usuario: user })
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (req, res) => {
    const id = req.params.id;
    const user = await usuarioRepository.update(id, req.body);
    if (user) {
        res.redirect("/usuario/" + user.idUsuario);
    } else {
        res.redirect("/usuario");
    }

}

const updateForm = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await usuarioRepository.getById(id);
    res.render("usuario/update", { user })
}


// ------------------------ D (Delete)------------

const remove = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await usuarioRepository.remove(id);
    res.redirect("/usuario");
}


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove
}