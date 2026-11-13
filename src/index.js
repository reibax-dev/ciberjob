//!  Con "npm run dev" , Nodemon arranca el servidor y lo mantiene en marcha, y lo reinicia al detectar cambios 

import dotenv from 'dotenv';                //* Importa la librería dotenv para poder leer variables de entorno desde un archivo .env
import express from 'express';              //* Importa el framework Express para poder crear el servidor web y gestionar rutas
import cors from 'cors';
import router from './routes/router.js';

dotenv.config()                             //* Carga las variables del archivo .env y las introduce en el objeto global 'process.env'

const app = express();                      //* Inicializa la aplicación de Express para empezar a configurar el servidor

//! Middlewares
app.use(cors());
app.use(express.json());                    //* Define el puerto: usa el valor del archivo .env (process.env.PORT) o, si no existe, el puerto 3000 por defecto
app.use(express.urlencoded())               // permite leer el body de los POST en formularios
app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", router);

const PORT = process.env.APP_PORT || 3000;      //* Pone al servidor a escuchar peticiones en el puerto definido y ejecuta una función cuando arranca con éxito

app.use("/", router);


app.listen(PORT, () => {                    
    console.log(`Servidor escuchando en el puerto ${PORT} `)
})                                          //* Muestra un mensaje en la consola de la terminal indicando que el servidor ya está funcionando








//! Conceptos clave que debes recordar:

//? • dotenv.config(): Debe ejecutarse siempre al principio de todo. Si intentas usar process.env.PORT antes de esta línea, JavaScript no sabrá qué es y te dará un error o usará el valor por defecto.

//? • process.env: Es un objeto nativo de Node.js donde se guardan todas las configuraciones secretas o variables externas (como contraseñas de bases de datos, claves de APIs o el puerto del servidor) para no escribirlas directamente en el código por seguridad.