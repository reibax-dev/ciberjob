import bcrypt from "bcrypt";
import usuarioRepository from "../../repositories/usuario.repository.js";
import trabajadorRepository from "../../repositories/trabajador.repository.js";
import empresaRepository from "../../repositories/empresa.repository.js";


function redirect(res,url,data = {}){
    const urlSearchParams = new URLSearchParams();
    for(const key in data){
        urlSearchParams.append(key,data[key]);
    }
    res.redirect(url+"?"+urlSearchParams.toString())
}
const registerForm = async (req, res) => {

    res.render("auth/register", {error: req.query.error})
}
const register = async (req, res) => {
    const { nombre, email, contrasenia, contraseniaRepeat, telefono } = req.body;
    const rol = "user";
    if (contrasenia !== contraseniaRepeat) {
        redirect(res,"/auth/register",{error:"Las contraseñas no coinciden"})
        return;
    }
    try {
        let oldUser = await usuarioRepository.getByEmail(email);
        if (oldUser) {
            redirect(res,"/auth/register",{error:"Ya existe un usuario con este email"})
            return;
        }
        oldUser = await usuarioRepository.getByUsername(nombre);
        if (oldUser) {
            redirect(res,"/auth/register",{error:"Ya existe un usuario con este nombre"})
            return;
        }
        const ususario = await usuarioRepository.create({nombre,email,contrasenia,telefono,admin:false})
        redirect(res,"/auth/login",{message:"Registro exitoso"})
        
    } catch (error) {
        console.error(error);
        redirect(res,"/auth/register",{error:"Error al registrarse"})
    }
}


const loginForm = async (req, res) => {

    res.render("auth/login", {error: req.query.error, message: req.query.message})
}

const login = async (req, res) => {
    const {email,contrasenia} = req.body;
    try {
        // se puede entrar con el email o con el nombre de usuario
        let usuario = await usuarioRepository.getByEmail(email);
        if(!usuario){
            usuario = await usuarioRepository.getByUsername(email);
        }
        if(!usuario){
            return redirect(res,"/auth/login",{error:"Credenciales incorrectas"});
        } 
        const compare = await bcrypt.compare(contrasenia,usuario.contrasenia);
        if(!compare){
            return redirect(res,"/auth/login",{error:"Credenciales incorrectas"});
        }
        let rol = "";
        let idTipo = 0;
        const trabajador = await trabajadorRepository.getByIdUsuario(usuario.idUsuario);
        const empresa = await empresaRepository.getByIdUsuario(usuario.idUsuario);
        if(trabajador){
            rol = "Trabajador";
            idTipo = trabajador.idTrabajador;
        }
        else if(empresa){
            rol = "Empresa";
            idTipo = empresa.idEmpresa;
        }
        else if(usuario.admin){
            rol = "Admin";
        }
        
        req.session.usuario = {idUsuario:usuario.idUsuario, nombre:usuario.nombre, admin:usuario.admin, rol: rol, idTipo};
        redirect(res,"/",{message:"Login exitoso"});

    } catch (error) {
        console.error(error);
        redirect(res,"/auth/login",{error:"Ha habido un error en el Login"});
    }
}


const logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}


export default {
    registerForm,
    register,
    loginForm,
    login,
    logout
}